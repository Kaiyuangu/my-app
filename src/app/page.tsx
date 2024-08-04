'use client'
import { useState } from "react";
import {useWindowSize} from 'react-use'
import Confetti from 'react-confetti'
export default function Home() {
  let[counter,setCounter]=useState(0);
  const { width, height } = useWindowSize()
  function handleClick(){
    setCounter(counter+1);
    console.log(counter);
  }
  return (
    <main className="flex items-center w-sccreen h-screen">
      {
        (counter>3)&&<Confetti width={width} height={height} wind={-0.09}/>
        
      }
      <div className="m-auto">
        <div >
          i have clicked {counter} time.
      </div>
      <div>
        <button onClick={handleClick} className="border rounded-lg p-2 bg-sky-400 text-white hover:bg-sky-600 active:bg-sky-800">
          Click Me!
        </button>
      </div>
      </div>
      
    </main>
  );
}
