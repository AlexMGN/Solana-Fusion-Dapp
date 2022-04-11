import { programs } from '@metaplex/js';
import { throwError } from './utils';
import axios from 'axios';

export const isOwnerOfThisNFT = async (
  connection,
  nft_mint,
  userPubKey,
): Promise<boolean> => {
  // On récupère le NFT de l'utilisateur
  const userHaveNFT = await connection.getTokenAccountsByOwner(userPubKey, {
    mint: nft_mint,
  });

  // S'il le possède on renvoi true sinon on renvoi false + une erreur
  if (userHaveNFT.value.length <= 0) {
    throwError('You are not the owner of this NFTs: ' + nft_mint);
    return false;
  } else {
    return true;
  }
};

export const getNFTMetadata = async (
  connection,
  nft_pubkey,
): Promise<object> => {
  try {
    // On récupère l'account metadata du NFT
    const metadata_account =
      await programs.metadata.MetadataProgram.findMetadataAccount(nft_pubkey);

    // On récupère l'uri du NFT
    const metadata_uri = await programs.metadata.Metadata.load(
      connection,
      metadata_account[0],
    );

    // On renvoi les metadata
    return (await axios.get(metadata_uri.data.data.uri)).data;
  } catch (e) {
    // On renvoi l'erreur de Metaplex s'il y en a une
    throwError('Metaplex: ' + e.message);
  }
};

export const equipNewAttribute = (oldMetadata, attribute): object => {
  // On push le nouvel attribut dans la liste des attributs existants et on le retourne
  oldMetadata.attributes.push({
    trait_type: 'New Attribute',
    value: attribute,
  });

  return oldMetadata;
};
