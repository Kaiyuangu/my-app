'use client';
import { notFound } from "next/navigation";
  import React,{useState}from"react";
  import useSWR from "swr";
  const fetcher = (url:string):Promise<any>=>fetch(url).then((response)=>response.json());
export default function Home() {
  const [isDay,setIsDay]=useState(true);
  const weatherAPIKey=process.env.NEXT_PUBLIC_WEATHER_APIKEY;
  const { data, error, isLoading } = useSWR(`/weather-api/v7/weather/3d?key=${weatherAPIKey}&location=101210101`,fetcher)
  const background=(isDay ? "from-orange-300 to-yellow-500":"from-blue-900 to-black");
  if(error){
    notFound();
  }
  if(isLoading){
    return(<div>Loading Date</div>)
  }
  if(!data||!data.daily||data.daily.length===0){
    return(<div>No Data Available</div>);
  }
  return (
   <div className={`h-screen flex flex-col justify-center items-center bg-gradient-to-b ${background}`}>
        <div className="text-center space-y-2">
            <h1 className="text-6xl font-bold text-white">{data.daily[0].tempMin}-{data.daily[0].tempMax}</h1>
            <p className="text-xl text-gray-100">Hangzhou sunny{isDay?data.daily[0].textDay:data.daily[0].textNight}</p>
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
