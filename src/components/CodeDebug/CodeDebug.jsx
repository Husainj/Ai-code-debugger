import React, { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

export default function CodeDebug() {
  const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

  const [inputText, setInputText] = useState("");
  const [addonInfo, setAddonInfo] = useState("");
  const [errors, setErrors] = useState("");
  const [solution, setSolution] = useState("");
  const [isLoading, setIsLoading] = useState(false);


  async function run() {
    try {
      // ONLY TEXT
      if (!inputText) {
        alert("Please enter text!");
        return;
      }

      const genAI = new GoogleGenerativeAI(API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      const prompt = `"${inputText} , ${addonInfo} ,  What is the error in this code ? Give me the error and return response in detail strictly in JSON format with the following as key value pairs. :
        Error : [what is the error and where it is located] 
        Solution : [Write the solution how the error can be resolved , DO NOT write whole code]  "`;

      console.log(prompt);
      const result = await model.generateContent(prompt);
      const text = result.response.text();
       console.log(text)
      const obj = JSON.parse(text);
      console.log(obj.Error);
      console.log(obj.Solution);
      setErrors(obj.Error);
      setSolution(obj.Solution);

      console.log(text);
    } catch (error) {
      console.error("fetchDataFromGeminiAPI error: ", error);
      alert("An error occurred. Please try again."); // Popup for errors
    } finally {
      setIsLoading(false); // Set loading back to false after all actions
    }
    }
  
  return (
  
      <div className="container mx-auto px-4 py-8 bg-black">
      <h1 className="text-4xl font-bold text-center mb-4 text-violet-700 font-['Inter', 'sans-serif']">
        AI Code Debugger
      </h1>
      <h2 className="text-xl font-medium text-center mb-4 text-white">
        Your coding friend!
      </h2>

      <div className="flex flex-col space-y-2">
        <label htmlFor="textarea1" className="text-sm font-medium text-white">
          Enter Your code: 
        </label>
        <textarea
          id="textarea1"
          name="textarea1"
          rows={15}
          value={inputText}
        onChange={(e) => setInputText(e.target.value)}
          className="border border-gray-300 p-2 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
        />
        <label htmlFor="textarea2" className="text-sm font-medium text-white">
         Enter any additional info about your code:
        </label>
        <textarea
          id="textarea2"
          name="textarea2"
          rows={2}
          value={addonInfo}
          onChange={(e) => setAddonInfo(e.target.value)}
          className="border border-gray-300 p-2 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
     
      <button
        onClick={run}
        className={`bg-orange-500 text-white py-2 px-4 rounded-lg hover:bg-orange-700 focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 mt-4 ${
          isLoading ? "cursor-not-allowed opacity-50" : ""
        }`}
        disabled={isLoading}
      >
        {isLoading ? (
          <div className="flex items-center">
            <Spinner size={20} color="white" />  {/* Configure Spinner component */}
            <span className="ml-2">Loading...</span>
          </div>
        ) : (
          "Find Error"
        )}
      </button>

      <div className="grid sm:grid-cols-2 gap-4 mt-8">
        <div className="p-4 rounded-lg shadow-md bg-gray-100 transform transition duration-500 hover:scale-105">
          <h3 className="text-lg font-medium mb-2 text-violet-700 font-['Inter', 'sans-serif']">
            Error :
          </h3>
          <p className="text-gray-700 font-['Inter', 'sans-serif']"> {errors}</p>
        </div>
        <div className="p-4 rounded-lg shadow-md bg-gray-100 transform transition duration-500 hover:scale-105">
          <h3 className="text-lg font-medium mb-2 text-violet-700 font-['Inter', 'sans-serif']">
            Solution :
          </h3>
          <p className="text-gray-700 font-['Inter', 'sans-serif']">{solution}</p>
        </div>
      </div>
    </div>

  );
}


//add laoding function