import {Movie} from "./movie";
import {Sale} from "./sale";

export class Show{

  constructor(private _id:string,private _movie_id:string,private _sale_id:string,private _date:Date) {
  }

  get id(): string {
    return this._id;
  }

  get movie(): string {
    return this._movie_id;
  }

  get sale(): string {
    return this._sale_id;
  }

  get date(): Date {
    return this._date;
  }
}
