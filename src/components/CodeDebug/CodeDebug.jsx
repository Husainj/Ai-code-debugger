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
        const prompt = `"${inputText} , You are a great coder , now debug the code provided to you (there can be syntax error or any other error) and return response in the following format only :
        Error : [what is the error] 
        Error explaination : [explain the error]  
        Solution : [How to fix that error]  "`

        console.log(prompt)
          const result = await model.generateContent(prompt);
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
        <textarea
          type="text"
          style={{ width: 400 , height:500}}
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
        <button onClick={run}>Click me </button>
        <div>Response: {data}</div>
        </>
    )
}