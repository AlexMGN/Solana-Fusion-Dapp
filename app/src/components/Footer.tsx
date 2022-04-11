import { FC } from 'react';

export const Footer: FC = () => {
    return (
        <div className="">
            <footer className="mx-auto  flex flex-row p-2 text-center items-center footer bg-neutral text-neutral-content">
                <div className="mx-auto text-center">
                    <div>
                        <p className="text-white text-base font-light cursor-default ">
                            Powered by <span className="font-bold">Swifty🍦</span>
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
};
