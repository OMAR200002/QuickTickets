export enum seatStatus{
available,Reserved,selected
}
export class Seat {
  seatId: number;
  //Should be a cinema object, not a string
  cinema: string;
  status: seatStatus;

  constructor(seatId: number, cinema: string, status: seatStatus) {
    this.seatId = seatId;
    this.cinema = cinema;
    this.status = status;
  }


}
