'use client'
import Image from "next/image";
import {useState} from "react";
export default function Home() {
const moons=["🌑","🌒","🌓","🌔","🌕","🌖","🌗","🌘","🌑"];
const [index,setI]=useState(0);
  function showAlert(){
  setI((index+1)%moons.length);
}
  return (
   <main>
      <div className="text-xl italic">
        {moons[index]}
      </div>
      <button onClick={showAlert} className="border rounded-md hover:bg-slate-100 p-1">
        按钮
      </button>
  </main>
  );
}
