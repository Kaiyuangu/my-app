
const fetcher = (url:string):Promise<any>=>
     fetch(url).then((response)=>response.json());

export{fetcher};