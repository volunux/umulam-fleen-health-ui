
export class ProfessionalScheduleHealthSessionView {

  public date: Date;
  public time: string;
  public timezone: string;

  public constructor(data: ProfessionalScheduleHealthSessionView) {
    this.date = data?.date ? new Date(data.date) : data?.date;
    this.time = data?.time ? data.time : data?.time;
    this.timezone = data?.timezone ? data.timezone : data?.timezone;
  }
}
