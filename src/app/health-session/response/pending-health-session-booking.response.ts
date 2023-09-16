import {manyToType} from "../../shared/util/helpers";

export class PendingHealthSessionBookingResponse {

  public transactionReference: string;
  public memberFirstName: string;
  public memberLastName: string;
  public memberEmailAddress: string;
  public timezone: string;
  public professionalPrice: string;
  public professionalPriceCurrency: string;
  public actualPriceToPay: string;
  public actualPriceCurrency: string;
  public bookedPeriods: BookSessionPeriod[];

  public constructor(data: PendingHealthSessionBookingResponse) {
    this.transactionReference = data?.transactionReference ? data.transactionReference : data?.transactionReference;
    this.memberFirstName = data?.memberFirstName ? data.memberFirstName : data?.memberFirstName;
    this.memberLastName = data?.memberLastName ? data.memberLastName : data?.memberLastName;
    this.memberEmailAddress = data?.memberEmailAddress ? data.memberEmailAddress : data?.memberEmailAddress;
    this.timezone = data?.timezone ? data.timezone : data?.timezone;
    this.professionalPrice = data?.professionalPrice ? data.professionalPrice : data?.professionalPrice;
    this.professionalPriceCurrency = data?.professionalPriceCurrency ? data.professionalPriceCurrency : data?.professionalPriceCurrency;
    this.actualPriceToPay = data?.actualPriceToPay ? data.actualPriceToPay : data?.actualPriceToPay;
    this.actualPriceCurrency = data?.actualPriceCurrency ? data.actualPriceCurrency : data?.actualPriceCurrency;
    this.bookedPeriods = data?.bookedPeriods ? manyToType(BookSessionPeriod, data.bookedPeriods) : data?.bookedPeriods;
  }
}

export class BookSessionPeriod {
  public startDate: Date;
  public endDate: Date;

  public constructor(data: BookSessionPeriod) {
    this.startDate = data?.startDate ? new Date(data.startDate) : data?.startDate;
    this.endDate = data?.endDate ? new Date(data.endDate) : data?.endDate;
  }
}
