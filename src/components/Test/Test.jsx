import React from "react";

export default function Test() {
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
          className="border border-gray-300 p-2 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
        />
        <label htmlFor="textarea2" className="text-sm font-medium text-white">
         Enter any additional info about your code:
        </label>
        <textarea
          id="textarea2"
          name="textarea2"
          rows={2}
          className="border border-gray-300 p-2 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
      <button
   
        className="bg-orange-500 text-white py-2 px-4 rounded-lg hover:bg-orange-700 focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 mt-4"
      >
        Find Error
      </button>

      <div className="grid sm:grid-cols-2 gap-4 mt-8">
        <div className="p-4 rounded-lg shadow-md bg-gray-100 transform transition duration-500 hover:scale-105">
          <h3 className="text-lg font-medium mb-2 text-violet-700 font-['Inter', 'sans-serif']">
            Error :
          </h3>
          <p className="text-gray-700 font-['Inter', 'sans-serif']">Error :</p>
        </div>
        <div className="p-4 rounded-lg shadow-md bg-gray-100 transform transition duration-500 hover:scale-105">
          <h3 className="text-lg font-medium mb-2 text-violet-700 font-['Inter', 'sans-serif']">
            Solution :
          </h3>
          <p className="text-gray-700 font-['Inter', 'sans-serif']">Solution :</p>
        </div>
      </div>
    </div>
  );
}
