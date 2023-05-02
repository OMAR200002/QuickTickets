import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConfirmBuyPage } from './confirm-buy.page';

describe('ConfirmBuyPage', () => {
  let component: ConfirmBuyPage;
  let fixture: ComponentFixture<ConfirmBuyPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ConfirmBuyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
