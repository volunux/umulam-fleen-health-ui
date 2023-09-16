import {MemberView} from "../../member/view/member.view";
import {HealthSessionStatus} from "../enum/health-session.enum";

export class HealthSessionView {

  public id: number;
  public reference: string;
  public patient: MemberView;
  public professional: MemberView;
  public comment: string;
  public note: string;
  public date: Date;
  public time: string;
  public timezone: string;
  public status: HealthSessionStatus;
  public location: string;
  public document: string;
  public meetingLink: string;
  public eventLink: string;

  public constructor(data: HealthSessionView) {
    this.id = data?.id ? data.id : data?.id;
    this.reference = data?.reference ? data.reference : data?.reference;
    this.patient = data?.patient ? new MemberView(data.patient) : data?.patient;
    this.professional = data?.professional ? new MemberView(data.professional) : data?.professional;
    this.comment = data?.comment ? data.comment : data?.comment;
    this.note = data?.note ? data.note : data?.note;
    this.date = data?.date ? new Date(data.date) : data?.date;
    this.time = data?.time ? data.time : data.time;
    this.timezone = data?.timezone ? data.timezone : data?.timezone;
    this.status = data?.status ? data.status : data?.status;
    this.location = data?.location ? data.location : data?.location;
    this.document = data?.document ? data.document : data?.document;
    this.meetingLink = data?.meetingLink ? data.meetingLink : data?.meetingLink;
    this.eventLink = data?.eventLink ? data.eventLink : data?.eventLink;
  }
}
