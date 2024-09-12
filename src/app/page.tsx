'use client';
import { notFound } from "next/navigation";
  import React,{useState}from"react";
  import useSWR from "swr";
  const fetcher = (url:string):Promise<any>=>fetch(url).then((response)=>response.json());
export default function Home() {
  const [isDay,setIsDay]=useState(true);
  const weatherAPIKey=process.env.NEXT_PUBLIC_WEATHER_APIKEY;
  const { data:recentData, error:recentError, isLoading:recentIsLoading } = useSWR(`/weather-api/v7/weather/3d?key=${weatherAPIKey}&location=101210101`,fetcher)
  const { data:nowData, error:nowError, isLoading:nowIsLoading } = useSWR(`/weather-api/v7/weather/now?key=${weatherAPIKey}&location=101210101`,fetcher)
  const background=(isDay ? "from-orange-300 to-yellow-500":"from-blue-900 to-black");
  if(recentError||nowError){
    notFound();
  }
  if(recentIsLoading||nowIsLoading){
    return(<div>Loading Data</div>)
  }
  if(!recentData||!recentData.daily||recentData.daily.length===0){
    return(<div>No Data Available</div>);
  }
  return (
   <div className={`h-screen flex flex-col items-center bg-gradient-to-b ${background} pl-32 pr-32 pt-16`}>
        <div className="text-center space-y-2">
            <p className="text-xl text-gray-100">Hangzhou sunny</p>
            <p className="text-6xl font-extralight text-white">{nowData.now.temp}°C</p>
            <div className="flex flex-row space-x-4 justify-center">
              <p className="text-3xl font-extralight text-white">{recentData.daily[0].tempMax}°C</p>
              <p className="text-3xl font-extralight text-white">{recentData.daily[0].tempMin}°C</p>
            </div>
            <p className="text-md text-gray-200 font-extrabold">{isDay?recentData.daily[0].textDay:recentData.daily[0].textNight}</p>
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
