import {FileConstraints} from "../type/other";

export const PROFESSIONAL_TYPES: string[] = ['PROFESSIONAL', 'USER'];
export const GENDER: string[] = ['MALE', 'FEMALE', 'OTHER'];
export const VERIFICATION_TYPES: string[] = ['EMAIL', 'PHONE'];
export const SUPPORTED_CONTENT_TYPES: string[] = ['application/json', 'application/x-www-form-urlencoded'];
export const NO_INPUT_KEY: string = 'NONE';
export const DATE_TYPE: string = 'Date';
export const BETWEEN_DATE_TYPE: string = 'BetweenDate';
export const BETWEEN_DATE_SEARCH_KEY: string = 'betweenDate';
export const AFTER_DATE_SEARCH_KEY: string = 'afterDate';
export const BEFORE_DATE_SEARCH_KEY: string = 'beforeDate';
export const BETWEEN_DATE_SEARCH_LABEL: string = 'Between Date';
export const AFTER_DATE_SEARCH_LABEL: string = 'After Date';
export const BEFORE_DATE_SEARCH_LABEL: string = 'Before Date';
export const DEFAULT_VERIFICATION_TYPE: string = 'EMAIL';
export const DEFAULT_FORM_CONTROL_VALUE: string = '';
export const DEFAULT_PAGE_NO_KEY: string = 'page';
export const DEFAULT_IMAGE_TYPES: string[] = ['image/jpeg', 'image/png'];

export const DEFAULT_IMAGE_CONSTRAINT: FileConstraints = {
  maxFileSize: 1,
  allowableTypes: DEFAULT_IMAGE_TYPES,
  fileSizeUnit: 'MB'
}
