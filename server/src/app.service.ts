import { Injectable } from '@nestjs/common';
import { PublicKey, Connection } from '@solana/web3.js';
import { sign } from 'tweetnacl';
import { signatureIsVerified, throwError } from "./utils/utils";
import {
  equipNewAttribute,
  getNFTMetadata,
  isOwnerOfThisNFT,
} from './utils/nft';

interface FusionParams {
  userPubkey: PublicKey;
  signedMessage: {
    type: string;
    data: [];
  };
  nft: string;
  attribut: string;
}

@Injectable()
export class AppService {
  async equipAttribute(params: FusionParams): Promise<object> {
    // On prépare et encode le message
    const message = `Sign below to equipe a new attribute`;
    const encodedMessage = new TextEncoder().encode(message);

    // On récupère la pubkey de nos différents éléments
    const userPubKey = new PublicKey(params.userPubkey);
    const nftPubKey = new PublicKey(params.nft);
    const attributePubKey = new PublicKey(params.attribut);

    // On vérifie que l'utilisateur qui appel l'API est celui qui à signé
    if (
      signatureIsVerified(
        encodedMessage,
        params.signedMessage.data,
        userPubKey.toBytes(),
      )
    ) {
      // On se connecte à Solana
      const connection = new Connection('https://api.devnet.solana.com');

      // On vérifie si l'utilisateur est l'owner du NFT 1 & 2
      if (
        (await isOwnerOfThisNFT(connection, nftPubKey, userPubKey)) &&
        (await isOwnerOfThisNFT(connection, attributePubKey, userPubKey))
      ) {
        // On récupère les metadatas du NFT
        const nft_metadata = await getNFTMetadata(connection, nftPubKey);

        // On fusionne le nouvel attribut et on retourne le nouveau json
        return equipNewAttribute(nft_metadata, params.attribut);
      }
    } else {
      // On renvoi une erreur si l'utilisateur n'est pas le signer
      throwError('You are not authorized');
    }
  }
}
