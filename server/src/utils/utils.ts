import { HttpException, HttpStatus } from '@nestjs/common';
import { sign } from 'tweetnacl';

export const signatureIsVerified = (
  encodedMessage,
  signedMessage,
  userPubKey,
): boolean => {
  // On vérifie si l'utilisateur qui appel est bien le signer
  return sign.detached.verify(
    encodedMessage,
    new Uint8Array(signedMessage),
    new Uint8Array(userPubKey),
  );
};

export const throwError = (message) => {
  // On throw une erreur avec un message personnalisé
  throw new HttpException(
    {
      status: HttpStatus.FORBIDDEN,
      error: message,
    },
    HttpStatus.FORBIDDEN,
  );
};
