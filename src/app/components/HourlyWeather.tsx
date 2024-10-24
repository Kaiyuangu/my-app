import {fetcher} from"@/app/utils/fetcher"
import useSWR from "swr";
interface HourlyWeatherProps{
    latitude:number;
    longitude:number;
    API_KEY:string;
}
export interface HourlyRootObject {
    code: string;
    updateTime: string;
    fxLink: string;
    hourly: HourlyData[];
    refer: Refer;
  }
  export interface HourlyData{
    fxTime:string;
    temp:string;
    icon:string;
    text:string;
    wind360:string;
    windDir:string;
    windScale:string;
    windSpeed:string;
    humidity:string;
    pop:string;
    precip:string;
    pressure:string;
    cloud:string;
    dew:string;
  }
  export interface Refer{
    sources:string[];
    license:string[];
  }
function HourlyWeather( {latitude,longitude,API_KEY}:HourlyWeatherProps){
    const { data: hourlyData, error: hourlyError, isLoading: hourlyIsLoading } = useSWR<HourlyRootObject>( longitude===0 && latitude===0 ? null:`/weather-api/v7/weather/24h?key=${API_KEY}&location=${longitude},${latitude}`, fetcher);
    if (!hourlyData||!hourlyData.hourly) {
        return (<div>No Data Available</div>);
    }
    const weatherHourly = hourlyData.hourly;
    return(
        <div className="flex flex-col space-y-2 m-auto overflow-x-scroll w-1/3  bg-opacity-20 bg-gray-50 backdrop-blue-sm rounded-lg p-4 rounded-md ">
            <span className="text-sm font-bold text-left">🕓 每小时天气预报</span>
            <div className="flex flex-row space-x-8">
                {weatherHourly.map((weather, index) => {
                    return (
                    <div key={index} className="flex flex-col space-y-2">
                        <span className="white-space:nowrap">{(new Date(Date.now()).getHours() + index) % 24}时</span>
                        <span className="font-medium">{weather.temp}°C</span>
                        <i className={(`qi-${weather.icon}-fill`)}></i>
                    </div>);
                })
                }
            </div>
        </div>
    )
}

export {HourlyWeather};