"use client";
import Image from "next/image";
import { useState } from "react";
export default function Home() {
  const moons = ["🌑", "🌒", "🌓", "🌔", "🌕", "🌖", "🌗", "🌘", "🌑"];
  const [index, setIndex] = useState(0);
  let [moonInterver,setMoonInterver] =useState<NodeJS.Timeout|null>(null);
  function nextIndex() {
    if(moonInterver!==null){
      clearInterval(moonInterver);
      setMoonInterver(null);
    }else{
      const _mooonInterver=setInterval(()=>{
        setIndex((oldIndex)=>{
          return(oldIndex+1)%moons.length;
        });
      },50);
      setMoonInterver(_mooonInterver);
    }
  }
  return (
    <main>
      <div className="text-xl italic">{moons[index]}</div>
      <button
        onClick={nextIndex}
        className="border rounded-md hover:bg-slate-100 p-1"
      >
        按钮
      </button>
    </main>
  );
}
