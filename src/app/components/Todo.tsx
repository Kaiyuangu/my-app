import {TodoStatus}from "../Todo";
interface TodoArgs{
    title:string,
    expireDate:number,
    status:TodoStatus
}
function convertTimestampToDateString(expireDate:number){
    let date=new Date(expireDate);
    console.log(expireDate);
    //return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`
    return date.toDateString();
}
function Todo({title,expireDate,status}:TodoArgs){
    return (<div className="border ruturned-md shadow-md
    bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-while font-bold rounded-lg p-3 hover:opacity-80 text-white">
        <div>
            {title}
        </div>
        <div className="text-sm font-light">
                {convertTimestampToDateString(expireDate)}
        </div>
    </div>
    );
}

export{Todo};