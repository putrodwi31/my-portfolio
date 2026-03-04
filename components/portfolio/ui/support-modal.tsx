import Image from "next/image";
import { ReactElement } from "react";
import { FaTimes } from "react-icons/fa";

type SupportModalProps = {
    onClose: () => void;
};

export function SupportModal({ onClose }: SupportModalProps): ReactElement {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-4 backdrop-blur-sm" onClick={onClose}>
            <div className="relative w-full max-w-sm border border-border bg-bg p-6" onClick={(event) => event.stopPropagation()}>
                <button
                    type="button"
                    aria-label="Close support modal"
                    className="absolute top-3 right-3 text-gray-400 transition hover:text-white"
                    onClick={onClose}
                >
                    <FaTimes className="text-xl" />
                </button>
                <div className="space-y-4 text-center">
                    <div>
                        <p className="mb-1 text-xs tracking-[0.2em] text-gray-500 uppercase">Support</p>
                        <h3 className="text-xl font-bold text-white">Scan Dana</h3>
                    </div>
                    <div className="border border-border bg-zinc-900 p-3">
                        <Image
                            src="/assets/images/dana.jpeg"
                            alt="Dana Support"
                            width={900}
                            height={900}
                            className="h-full w-full object-contain"
                        />
                    </div>
                    <p className="text-sm leading-relaxed text-gray-400">
                        Terima kasih sudah mendukung. Scan kode QR untuk mengirim apresiasi.
                    </p>
                </div>
            </div>
        </div>
    );
}
