import {AvailabilityDayOfTheWeek} from "../enum/professional.enum";

export class ProfessionalAvailabilityView {

  public dayOfTheWeek: AvailabilityDayOfTheWeek;
  public startTime: Date;
  public endTime: Date;

  public constructor(data: ProfessionalAvailabilityView) {
    this.dayOfTheWeek = data?.dayOfTheWeek ? data.dayOfTheWeek : data?.dayOfTheWeek;
    this.startTime = data?.startTime ? data.startTime : data?.startTime;
    this.endTime = data?.endTime ? data.endTime : data?.endTime;
  }
}
