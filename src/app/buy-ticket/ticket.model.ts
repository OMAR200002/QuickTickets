
export class Ticket {
  private ticketId: number;
  //It's a movie object, not string
  private movie: string;


  private cinema: string;
  private showTime: Date;
  private qrCode: string;
  private price: number;
  private seatId: number;

  constructor(ticketId: number,movie: string,cinema: string, showTime: Date, qrCode: string,price: number,seatId: number){
    this.ticketId = ticketId;
    this.movie = movie;
    this.cinema = cinema;
    this.showTime = showTime;
    this.qrCode = qrCode;
    this.price = price;
    this.seatId = seatId;
  }

}
