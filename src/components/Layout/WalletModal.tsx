import React from "react";

interface WalletModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConnect: () => void;
  walletAddress: string | null;
  error: string | null;
}

export const WalletModal: React.FC<WalletModalProps> = ({
  isOpen,
  onClose,
  onConnect,
  walletAddress,
  error,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white rounded-lg p-6 w-96 shadow-lg">
        <h2 className="text-xl font-bold mb-4">Connect Wallet</h2>

        {walletAddress ? (
          <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-md mb-4">
            <p className="text-emerald-700 font-medium">
              Connected: {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
            </p>
          </div>
        ) : (
          <>
            <button
              onClick={onConnect}
              className="w-full px-4 py-2 bg-gradient-to-r from-blue-600 to-emerald-500 text-white rounded-lg font-medium hover:from-blue-700 hover:to-emerald-600 transition-all duration-300"
            >
              Connect with MetaMask
            </button>
            {error && (
              <p className="text-red-600 text-sm mt-3">{error}</p>
            )}
          </>
        )}

        <button
          onClick={onClose}
          className="mt-4 w-full px-4 py-2 border rounded-lg hover:bg-gray-100"
        >
          Close
        </button>
      </div>
    </div>
  );
};
