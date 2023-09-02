import {AnyProp} from "../type/base";

export const statusText: AnyProp = {
  'error': 'An error has occurred.',
  'timeout': 'Request has timed out',
  'filesize': {
    'valid' : 'File size is valid and file can be uploaded.',
    'invalid' : (size, label = 'MB') => {
      return `File is too large. File size should be less than equal to ${size}${label}`;
    }
  },
  'filetype': {
    'invalid' : (allowedTypes) => {
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
    'inProgress': (percentage) => {
      return `Uploading file: ${percentage}%`;
    }
  },
  'deleteObject': {
    'inProgress': 'Processing delete. Please wait.',
    'success': 'File deleted. Select a file.',
    'error': 'An error has occurred. Please try again.'
  },
  'fileTypeAllowedToUploadText' : 'Only Image Files or Documents with file extensions like docx or pdf is allowed in this field.',
  'fileChosenText' : (fileName) => {
    fileName = fileName && fileName.trim() !== ''
      ? fileName
      : 'Unknown';

    if (fileName.length > 12) {
      fileName = fileName.slice(0, 8).concat('...');
    }
    return `File named ${fileName} has been selected`;
  }
};
