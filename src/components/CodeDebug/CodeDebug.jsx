import React, { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
  
export default function CodeDebug(){
    const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
    const [data, setData] = useState(undefined);
    const [inputText, setInputText] = useState("");


    async function run() {
        try {
          // ONLY TEXT
          if (!inputText) {
            alert("Please enter text!");
            return;
          }

          const genAI = new GoogleGenerativeAI(API_KEY);
          const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    
          const result = await model.generateContent(inputText);
          const text = result.response.text();
      
          setData(text)
          console.log(text)
        } catch (error) {
          console.error("fetchDataFromGeminiAPI error: ", error);
        }
      }

    return(
        <>
        <h1>Code Debugger</h1>
        <h2>Your code helper!</h2>
        <input
          type="text"
          style={{ width: 400 }}
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
        <button onClick={run}>Click me </button>
        <div>Response: {data}</div>
        </>
    )
}