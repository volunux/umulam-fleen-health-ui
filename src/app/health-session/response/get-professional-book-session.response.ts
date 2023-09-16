import {ProfessionalAvailabilityView} from "../../professional/view/professional-availability.view";
import {ProfessionalScheduleHealthSessionView} from "../view/professional-schedule-health-session.view";
import {manyToType} from "../../shared/util/helpers";

export class GetProfessionalBookSessionResponse {

  public availabilityPeriods: ProfessionalAvailabilityView[];
  public scheduledSessions: ProfessionalScheduleHealthSessionView[];

  public constructor(data: GetProfessionalBookSessionResponse) {
    this.availabilityPeriods = data?.availabilityPeriods ? manyToType(ProfessionalAvailabilityView, data.availabilityPeriods) : [];
    this.scheduledSessions = data?.scheduledSessions ? manyToType(ProfessionalScheduleHealthSessionView, data.scheduledSessions) : [];
  }
}
