import {fetcher} from "@/app/utils/fetcher"
import useSWR from "swr";
interface WeatherIndexProps{
    latitude:number;
    longitude:number;
    API_KEY:string;
    isDay:boolean;
}
interface Daily{
    date:string;
    type:string;
    name:string;
    level:string;
    catrgory:string;
    text:string;
}
interface WeatherIndexData{
    code:string;
    updateTime:string;
    fxLink:string;
    daily:Daily[];
}
function WeatherIndex({longitude,latitude,API_KEY,isDay}:WeatherIndexProps){
    const {
        data,error,isLoading
    } = useSWR<WeatherIndexData>(
        longitude === 0 && latitude === 0
        ? null
        : `/weather-api/v7/indices/1d?type=1,3,8,10,15,16&location=${longitude},${latitude}&key=${API_KEY}`,
        fetcher
    );
    if(!data){
        return(
            <div>
                Loading.....
            </div>
        )
    }
    const first3Elements =data.daily.slice(0,3);
    const last3Elements =data.daily.slice(3,6);
    const textColor = isDay ? "text-black" : "text-gray-300"
    return(
        <div>
            <div className="flex-1 flex flex-row space-x-2 space-y-2">
                {
                    first3Elements.map((item)=>(
                        <div className="flex flex-col space-y-2 m-auto overflow-x-scroll bg-opacity-20 bg-gray-50 backdrop-blur-sm p-4 rounded-lg w-1/3 h-auto">
                        <span className={`text-sm font-bold text-left ${textColor}`}>{item.name}</span>
                            <div className={`flex flex-col text-left ${textColor}`}>
                                <div>{item.text}</div>
                            </div>
                        </div>
                    ))
                }
            </div>
            <div className="flex-1 flex flex-row space-x-2 space-y-2">
                {
                    last3Elements.map((item)=>(
                        <div className="flex flex-col space-y-2 m-auto overflow-x-scroll bg-opacity-20 bg-gray-50 backdrop-blur-sm p-4 rounded-lg w-1/3 h-auto">
                        <span className={`text-sm font-bold text-left ${textColor}`}>{item.name}</span>
                            <div className={`flex flex-col text-left ${textColor}`}>
                                <div>{item.text}</div>
                            </div>
                        </div>
                    ))
                }
                
            </div>
        </div>
    )
}
export{WeatherIndex};