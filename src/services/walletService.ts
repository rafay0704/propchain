export const isMetaMaskInstalled = () => {
  return typeof (window as any).ethereum !== "undefined";
};

export const connectMetaMask = async (): Promise<string> => {
  const { ethereum } = window as any;

  if (!ethereum) {
    throw new Error("MetaMask not installed");
  }

  try {
    const accounts: string[] = await ethereum.request({
      method: "eth_requestAccounts",
    });
    if (!accounts || accounts.length === 0)
      throw new Error("No accounts found");
    return accounts[0];
  } catch (err: any) {
    if (err.code === 4001) throw new Error("User rejected connection");
    throw err;
  }
};
