export type DeleteIdsDto = {
  ids: Array<string | number>;
}

export type FileConstraints = {
  maxFileSize: number;
  allowableTypes: string[];
  fileSizeUnit: 'MB'
}
