
export type BookHealthSessionDto = {
  comment: string;
  professional: string;
  document: string;
  sessionPeriods: SessionPeriod[]
}

export type SessionPeriod = {
  date: string;
  time: string;
}

export type ReScheduleHealthSessionDto = {
  professional: string;
  date: string;
  time: string;
}

export type AddHealthSessionReviewDto = {
  review: string;
  reviewRating: string;
}
