import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BuyTicketPage } from './buy-ticket.page';

describe('BuyTicketPage', () => {
  let component: BuyTicketPage;
  let fixture: ComponentFixture<BuyTicketPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(BuyTicketPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
