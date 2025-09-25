import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import { Navbar } from "./components/Layout/Navbar";
import { HomePage } from "./pages/HomePage";
import { ListingsPage } from "./pages/ListingsPage";
import { PropertyDetailPage } from "./pages/PropertyDetailPage";
import { FavoritesPage } from "./pages/FavoritesPage";
import { DashboardPage } from "./pages/DashboardPage";
import { WalletModal } from "./components/Layout/WalletModal";
import { connectMetaMask, isMetaMaskInstalled } from "./services/walletService";

const AppContent: React.FC = () => {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [favorites, setFavorites] = useState(["1", "4"]);
  const navigate = useNavigate();

  const openWalletModal = () => setIsModalOpen(true);
  const closeWalletModal = () => setIsModalOpen(false);

  const handleConnectWallet = async () => {
    setError(null);
    try {
      if (!isMetaMaskInstalled()) {
        
       
        setError(
          "MetaMask not installed. Please install it: https://metamask.io/"
        );
        return;
      }

      const account = await connectMetaMask();
      setWalletAddress(account);
      setIsModalOpen(false);
    } catch (err: any) {
      if (err.message.includes("User rejected")) {
        setError("Connection request rejected.");
      } else {
        setError(err.message || "Failed to connect wallet");
      }
    }
  };

  const handleToggleFavorite = (propertyId: string) => {
    setFavorites((prev) =>
      prev.includes(propertyId)
        ? prev.filter((id) => id !== propertyId)
        : [...prev, propertyId]
    );
  };

  const handlePropertyClick = (propertyId: string) => {
    navigate(`/property/${propertyId}`);
  };

  return (
    <>
      <Navbar onConnectWallet={openWalletModal} walletAddress={walletAddress} />

      <WalletModal
        isOpen={isModalOpen}
        onClose={closeWalletModal}
        onConnect={handleConnectWallet}
        walletAddress={walletAddress}
        error={error}
      />

      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              onToggleFavorite={handleToggleFavorite}
              onPropertyClick={handlePropertyClick}
            />
          }
        />
        <Route
          path="/listings"
          element={
            <ListingsPage
              onToggleFavorite={handleToggleFavorite}
              onPropertyClick={handlePropertyClick}
            />
          }
        />
        <Route
          path="/property/:id"
          element={
            <PropertyDetailPage onToggleFavorite={handleToggleFavorite} />
          }
        />
        <Route
          path="/favorites"
          element={
            <FavoritesPage
              favorites={favorites}
              onToggleFavorite={handleToggleFavorite}
              onPropertyClick={handlePropertyClick}
            />
          }
        />
        <Route
          path="/dashboard"
          element={
            <DashboardPage
              walletConnected={!!walletAddress}
              onConnectWallet={connectMetaMask}
            />
          }
        />
      </Routes>
    </>
  );
};

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
