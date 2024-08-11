interface ButtonArgs{
    icon:string,
    bgColor: string,
    label: string,
    onClick?:()=>void
  }

  function Button({icon,bgColor,label, onClick}: ButtonArgs ) {
    return(
      <div>
          <button onClick={onClick} className="w-full flex item-cented bg-gray-300 hover:bg-gray-400 active:bg-gray-500 rounded-lg px-2 py-3 my-1">
            <div className={`w-6 h-6 rounded-full text-cented text-white ${bgColor}`}>
              {icon}
            </div>
            <div className="ml-3">
              {label}
            </div>
          </button>
      </div>
    );
}

    export{Button};
    export type {ButtonArgs}