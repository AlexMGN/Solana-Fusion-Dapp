// Next, React
import { FC, useState } from 'react';

// Wallet
import { useWallet } from '@solana/wallet-adapter-react';

// Notification
import { notify } from "../../utils/notifications";

// Client
import { equipAttribute } from "../../utils/client";

export const HomeView: FC = ({}) => {
  const { publicKey, signMessage } = useWallet();
  const [attributes, setAttributes] = useState([]);

  const fusion = async () => {
    try {
      const newAttribute = await equipAttribute(publicKey, signMessage);
      setAttributes(newAttribute.attributes)
    } catch (e) {
      notify({
        type: 'error',
        message: e.message
      })
    }
  }

  return (
    <div className="md:hero mx-auto p-4">
      <div className="md:hero-content flex flex-col">
        <div className="max-w-md mx-auto mockup-code bg-primary p-6 my-2">
          <pre data-prefix=">">
            <code className="truncate">Fusionner un équipement</code>
            <code className="truncate text-center">
              <div className="mb-6 mt-6 rounded-box text-black pl-7">
                <button
                  className="group w-60 m-2 btn animate-pulse disabled:animate-none bg-gradient-to-r from-[#9945FF] to-[#14F195] hover:from-pink-500 hover:to-yellow-500 ... "
                  onClick={fusion} disabled={!publicKey}
                >
                    <div className="hidden group-disabled:block">
                        Wallet not connected
                    </div>
                    <span className="block group-disabled:hidden" >
                        Fusionner
                    </span>
                </button>
              </div>
            </code>
          </pre>
        </div>
        <div>
          {
            attributes.map((attribute, index) =>
              <div key={index}>
                <p style={{ color: (attribute.trait_type === "New Attribute") ? "Green" : "" }}>{attribute.trait_type}</p>
                <p style={{ color: (attribute.trait_type === "New Attribute") ? "Green" : "" }}>{attribute.value}</p>
                <br/>
              </div>
            )
          }
        </div>
      </div>
    </div>
  );
};
