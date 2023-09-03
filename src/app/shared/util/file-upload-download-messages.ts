import {StatusText} from "../type/status-text";

export const statusText: StatusText = {
  'error': 'An error has occurred.',
  'timeout': 'Request has timed out',
  'filesize': {
    'valid' : 'File size is valid and file can be uploaded.',
    'invalid' : (size: number, label: string = 'MB'): string => {
      return `File is too large. File size should be less than equal to ${size}${label}`;
    }
  },
  'filetype': {
    'invalid' : (allowedTypes: string[]): string => {
      return `File type is invalid and file cannot be uploaded. Allowed types : ${allowedTypes.join(',')}`
    },
    'valid' : 'File type is valid and file can be uploaded.'
  },
  'fileUpload' : {
    'empty': 'Select a file to upload',
    'success': 'File uploaded',
    'allowableType' : 'image',
    'choose' : 'Choose a file',
    'required' : 'File upload required, select a file.' ,
    'optional' : 'File upload optional.',
    'error': 'An error has occurred. Please try again.',
    'abort': 'File upload cancelled.',
    'timeout': 'File upload timeout. Please try again.',
    'inProgress': (percentage: number | string): string => {
      return `Uploading file: ${percentage.toString()}%`;
    }
  },
  'deleteObject': {
    'inProgress': 'Processing delete. Please wait.',
    'success': 'File deleted. Select a file.',
    'error': 'An error has occurred. Please try again.'
  },
  'fileTypeAllowedToUploadText' : 'Only Image Files or Documents with file extensions like docx or pdf is allowed in this field.',
  'fileChosenText' : (fileName: string): string => {
    fileName = fileName && fileName.trim() !== ''
      ? fileName
      : 'Unknown';

    if (fileName.length > 12) {
      fileName = fileName.slice(0, 8).concat('...');
    }
    return `File named ${fileName} has been selected`;
  }
};
