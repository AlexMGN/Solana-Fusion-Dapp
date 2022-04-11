import axios from "axios";

export const equipAttribute = async (publicKey, signMessage) => {
  try {
    // On prépare et encode le message
    const message = `Sign below to equipe a new attribute`;
    const encodedMessage = new TextEncoder().encode(message);

    // Le user le sign avec son wallet
    const signedMessage = await signMessage(encodedMessage);

    // On prépare notre objet de fusion
    const fusion = {
      userPubkey: publicKey.toString(),
      signedMessage,
      nft: "F134njoEc1caZ7B6xq1KBizPpkusXMVBwjiiBJYyftM7",
      attribut: "6GyWbBZo3wTWZ8DBTXxwKWvH88ni36d3UCRaAE1RBrUL"
    }

    // On l'envoi à l'API
    return (await axios.post("http://localhost:3000/equip_attribute", { fusion })).data;
  } catch (e) {
    throw new Error(e.response.data.error);
  }
};