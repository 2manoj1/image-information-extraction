// Import necessary modules
import ollama from "ollama";
import { createWorker } from "tesseract.js";

/**
 * utils function for parse json data from string
 * @param {*} jsonData
 * @returns
 */
function parseJSON(jsonData) {
  console.log(typeof jsonData, jsonData);
  // Check if the string starts with ```json and ends with ```
  if (
    typeof jsonData === "string" &&
    jsonData.startsWith("```json") &&
    jsonData.endsWith("```")
  ) {
    // Remove ```json from the start and ``` from the end
    const trimmedString = jsonData.slice(7, -3).trim();
    console.log("trimmedString", trimmedString);
    try {
      // Attempt to parse the JSON string
      return JSON.parse(trimmedString);
    } catch (error) {
      console.error("Invalid JSON string:", error);
      return null;
    }
  } else if (
    typeof jsonData === "string" &&
    (jsonData.startsWith("{") || jsonData.startsWith("["))
  ) {
    try {
      // Attempt to parse the JSON string
      return JSON.parse(JSON.stringify(jsonData));
    } catch (error) {
      console.error("Invalid JSON string:", error);
      return null;
    }
  } else if (typeof jsonData === "object") {
    // If it's already an object, return it
    console.warn("Input is already a JavaScript object.");
    return jsonData;
  } else {
    // If it's neither a string nor an object, return null
    console.error(
      "Invalid input. Expected a JSON string or JavaScript object."
    );
    return null;
  }
}

// Function to perform OCR using Tesseract.js
const getDataFromImageOCR = async (imgSrc = "./aadhar2.jpeg") => {
  const worker = await createWorker(["eng", "hin"]);
  const ret = await worker.recognize(imgSrc);
  console.log("OCR Output >>> ", ret.data.text);
  await worker.terminate();
  return ret.data.text;
};

// Function to extract specific details using Ollama's llama2 model
const extractDetailsFromText = async (text) => {
  const res = await ollama.chat({
    model: "llama2",
    messages: [
      {
        role: "system",
        content:
          "Extract specific data: name, aadhar_id, address, dob, mob (if available), father_name, pin, state, country. English only and Your response should be in JSON stringfy format and no extra data only json data.",
      },
      {
        role: "user",
        content: text,
      },
    ],
  });

  return parseJSON(res.message.content);
};

(async () => {
  try {
    const text = await getDataFromImageOCR();
    const details = await extractDetailsFromText(text);
    console.log("Extracted details:", details);
  } catch (error) {
    console.error("Error:", error);
  }
})();

/**
 * Vision AI Alternative — Here I am Using GPT4V
 * @param {*} base64Image
 * @returns json
 */
const getDetailsFromImage = async (base64Image) => {
  if (!base64Image) return;
  const response = await openai.chat.completions.create({
    model: "gpt-4-vision-preview",
    max_tokens: 2000,
    messages: [
      {
        role: "system",
        content: `Extract details from the given image.
                  Instructions:
                  Full Name, Date of Birth (MM/DD/YYYY), Nationality, Identification Number, Address, City, Pincode/Zip, Country, Issue Date.
                  If not found, return an empty string.
                  Output should be in JSON format.
                  `,
      },
      {
        role: "user",
        content: [
          {
            type: "image_url",
            image_url: {
              url: `data:image/jpeg;base64,${base64Image}`,
            },
          },
        ],
      },
    ],
  });
  return parseJSON(response?.choices?.[0]?.message?.content);
};
