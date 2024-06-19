export interface IData {
    docs: Imovie[],
    limit:number,
    page:number,
    pages:number,
    total:number
}

export interface Imovie{
    description: string,
    id: number,
    name: string,
    year:number, 
    genres:{name:string}[],
    poster:{previewUrl:string, url:string},
    rating: {kp:number}
}


