import {nonNull} from "../util/helpers";
import {Injectable} from "@angular/core";

@Injectable()
export class S3Service {

  public extractBaseUrl(signedUrl: string | null): string | null {
    if (nonNull(signedUrl)) {
      const lastQuestionMarkIndex: number = signedUrl!.indexOf('?');

      if (lastQuestionMarkIndex !== -1) {
        return signedUrl!.substring(0, lastQuestionMarkIndex);
      } else {
        return signedUrl!;
      }
    }
    return null;
  }

  public getObjectKeyFromSignedUrl(signedUrl): string | null {
    if (nonNull(signedUrl)) {
      return signedUrl
        .substring(signedUrl.lastIndexOf("/") + 1, signedUrl.length)
        .split("?")[0];
    }
    return null;
  }
}
