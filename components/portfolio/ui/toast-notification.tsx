import { ReactElement } from "react";
import { FaCheck, FaTimes } from "react-icons/fa";

type ToastNotificationProps = {
    message: string;
    onClose: () => void;
};

export function ToastNotification({ message, onClose }: ToastNotificationProps): ReactElement {
    return (
        <div className="animate-slide-in fixed top-6 right-6 z-200">
            <div className="flex max-w-sm items-center gap-3 rounded-lg border border-border bg-surface px-6 py-4 shadow-lg">
                <div className="shrink-0 text-green-400">
                    <FaCheck className="text-xl" />
                </div>
                <div className="flex-1">
                    <p className="text-sm font-medium text-white">{message}</p>
                </div>
                <button
                    type="button"
                    className="shrink-0 text-gray-500 transition hover:text-gray-400"
                    onClick={onClose}
                    aria-label="Close notification"
                >
                    <FaTimes className="text-sm" />
                </button>
            </div>
        </div>
    );
}
