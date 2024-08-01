"use client";
import { useState } from "react";
import Image from "next/image";
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
          return(oldIndex+1)%30;
        });
      },50);
      setMoonInterver(_mooonInterver);
    }
  }
  return (
    <main>
     <Image src={index>=10?`/0${index}.jpg`:`/00${index}.jpg`} width={96} height={96} alt="moon">
     
     </Image>
      <button
        onClick={nextIndex}
        className="border rounded-md hover:bg-slate-100 p-1"
      >
        按钮
      </button>
    </main>
  );
}
