'use client';
  import React,{useState}from"react";
export default function Home() {
  const [isDay,setIsDay]=useState(true);
  const background=(isDay ? "from-orange-300 to-yellow-500":"from-blue-900 to-black");
  return (
   <div className={`h-screen flex flex-col justify-center items-center bg-gradient-to-b ${background}`}>
        <div className="text-center space-y-2">
            <h1 className="text-6xl font-bold text-white">11-24°C</h1>
            <p className="text-xl text-gray-100">Hangzhou sunny</p>
            <p className="text-xl text-gray-200">2024.09.04 Wednesday</p>
        </div >

        <div className="mt-8">
          <button
           className="px-4 py-2 bg-gray-700 text-white rounded-md"
           onClick={()=>setIsDay(!isDay)}
            >
              Toggle Day/Night
            </button>

        </div>
    </div>
  );
}
