export class Movie {

  constructor(private _id: string, private _title: string,private _posterPath: string,private _originLanguage:string,private _overview:string,private _voteAverage:number,private _category :string) {
  }
  get id(): string {
    return this._id;
  }

  get title(): string {
    return this._title;
  }

  get posterPath(): string {
    return this._posterPath;
  }

  get originLanguage(): string {
    return this._originLanguage;
  }

  get overview(): string {
    return this._overview;
  }

  get voteAverage(): number {
    return this._voteAverage;
  }

  get category(): string {
    return this._category;
  }


}
