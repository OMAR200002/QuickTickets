export enum seatStatus{
available,Reserved,selected
}
export class Seat {
  seatId: number;
  //Should be a cinema object, not a string

  status: seatStatus;

  constructor(seatId: number,  status: seatStatus) {
    this.seatId = seatId;

    this.status = status;
  }


}
