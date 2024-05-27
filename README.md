# Image Information Extraction

This project demonstrates how to extract information from images using Optical Character Recognition (OCR), Vision AI, and language models. It leverages `tesseract.js`(https://tesseract.projectnaptha.com) for OCR and integrates with Ollama's LLaMA2 model or GPT-4 Vision for advanced image analysis and text processing.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)

## Introduction

This project showcases the capabilities of OCR, Vision AI, and language models like GPT-4 in extracting and processing information from images. It uses `tesseract.js` for OCR and integrates with Ollama's LLaMA2 model for detailed text analysis.

## Features

- Extract text from images using OCR with `tesseract.js`
- Identify and analyze elements in images using Vision AI (GPT-4 Vision)
- Process and interpret extracted text using language models like LLaMA2

## Prerequisites

- Node.js installed (https://nodejs.org/en/download/package-manager)
- API keys for Vision AI services - GPT4V if your using that
- Basic knowledge of JavaScript and Node.js

## Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/2manoj1/image-information-extraction.git
   cd image-information-extraction
   ```

2. Install the dependencies:

   ```sh
   npm install
   ```

3. Create a `.env` file and add your API keys:

   ```env
   # OpenAI
   OPENAI_API_KEY=your_gpt4v_api_key
   ```

## Usage

1. Start the application:

   ```sh
   npm start
   ```

2. The application will perform OCR on the specified image and extract details using the language models. You can view the extracted and processed information in the console.

## Project Structure

- `index.js`: Main entry point of the application. Contains functions for OCR, text extraction, and Vision AI processing.
