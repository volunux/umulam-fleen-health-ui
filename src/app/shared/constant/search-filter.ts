import {
  AFTER_DATE_SEARCH_KEY,
  AFTER_DATE_SEARCH_LABEL,
  BEFORE_DATE_SEARCH_KEY,
  BEFORE_DATE_SEARCH_LABEL,
  BETWEEN_DATE_SEARCH_KEY,
  BETWEEN_DATE_SEARCH_LABEL,
  BETWEEN_DATE_TYPE,
  DATE_TYPE,
  NO_INPUT_KEY
} from "./enum-constant";
import {SearchFilter} from "../type/search";

export const SEARCH_FILTER_ALL_DATE: SearchFilter[] = [
  {key: NO_INPUT_KEY, label: ''},
  {key: BETWEEN_DATE_SEARCH_KEY, type: BETWEEN_DATE_TYPE, label: BETWEEN_DATE_SEARCH_LABEL },
  {key: AFTER_DATE_SEARCH_KEY, type: DATE_TYPE, label: AFTER_DATE_SEARCH_LABEL },
  {key: BEFORE_DATE_SEARCH_KEY, type: DATE_TYPE, label: BEFORE_DATE_SEARCH_LABEL }
];

export const SEARCH_FILTER_BETWEEN_DATE: SearchFilter[] = [
  {key: NO_INPUT_KEY, label: ''},
  {key: BETWEEN_DATE_SEARCH_KEY, type: BETWEEN_DATE_TYPE, label: BETWEEN_DATE_SEARCH_LABEL },
];


export const SEARCH_FILTER_VIEW_PROFESSIONALS: SearchFilter[] = [
  ...SEARCH_FILTER_BETWEEN_DATE,
  {key: 'firstName', label: 'First Name'},
  {key: 'lastName', label: 'Last Name' },
  {key: 'emailAddress', label: 'Email Address' },
  {key: 'verificationStatus', label: 'Verification Status' },
  {key: 'availabilityStatus', label: 'Availability Status'},
  {key: 'professionalType', label: 'Professional Type'},
  {key: 'professionalQualificationType', label: 'Qualification Type'},
  {key: 'languageSpoken', label: 'Language Spoken'}
];
