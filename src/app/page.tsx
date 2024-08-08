'use client'
import { useState } from "react";
import {useWindowSize} from 'react-use';
import Confetti from 'react-confetti';
import Countdown from "react-countdown";
export default function Home() {
  const { width, height } = useWindowSize()
  
  return (
    <main >
      <div className="h-screen w-screen flex">
            <Countdown date={Date.now()+5000} className="m-auto text-6xl font-extralight">
            <Confetti width={width}height={height} recycle={false} gravity={0.2} wind={-0.1} numberOfPieces={400}/>
            </Countdown>
      </div>
    </main>
  );
}
