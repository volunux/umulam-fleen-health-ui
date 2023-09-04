import {MfaType} from "../enum/mfa.enum";

export type MfaTypeDto = {
  mfaType: MfaType;
}

export type ConfirmMfaDto = MfaTypeDto & {
  code: string;
}
