import {Seat} from "./seat.model";

export class Sale{
  constructor(private _id:string,private _name:string,private _seats:Seat[]) {
  }

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get seats(): Seat[] {
    return this._seats;
  }
}
