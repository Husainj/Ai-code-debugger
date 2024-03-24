import React, { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

export default function CodeDebug() {
  const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

  const [inputText, setInputText] = useState("");
  const [addonInfo, setAddonInfo] = useState("");
  const [errors, setErrors] = useState("");
  const [solution, setSolution] = useState("");
  


  async function run() {
    try {
      // ONLY TEXT
      if (!inputText) {
        alert("Please enter text!");
        return;
      }

      const genAI = new GoogleGenerativeAI(API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      const prompt = `"${inputText} , ${addonInfo} ,  What is the error in this code ? Give me the error and return response in detail in the format of an json object with the following as key value pairs. :
        Error : [what is the error and where it is located] 
        Solution : [Write detailed description how to solve error]  "`;

      console.log(prompt);
      const result = await model.generateContent(prompt);
      const text = result.response.text();
       
      const obj = JSON.parse(text);
      console.log(obj.Error);
      console.log(obj.Solution);
      setErrors(obj.Error);
      setSolution(obj.Solution);

      console.log(text);
    } catch (error) {
      console.error("fetchDataFromGeminiAPI error: ", error);
    }
  }

  return (
    <>
      <h1>Code Debugger</h1>
      <h2>Your code helper!</h2>

      <textarea
        type="text"
        style={{ width: 400, height: 500 }}
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder="Enter Your code here"
      />
      <textarea
        type="text"
        style={{ width: 400, height: 300 }}
        value={addonInfo}
        onChange={(e) => setAddonInfo(e.target.value)}
        placeholder="Enter any additional details you want to provide . (Recommended to enter some detail about your code)"
      />
      <button onClick={run}>Click me </button>
      <div>Error : {errors}</div>
      <br />
      <div>Solution : {solution}</div>
    </>
  );
}


//add laoding function