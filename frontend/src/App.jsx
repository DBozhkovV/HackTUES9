import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useWeb3React } from '@web3-react/core';
import { connectorHooks, getName } from './utils/connectors';
import { MARKETPLACE_ADDRESS, S2L_ADDRESS } from './constants/constants';
import MARKETPLACE_ABI from './constants/abis/Marketplace.json';
import S2L_ABI from './constants/abis/S2LToken.json';
import { getContract } from './utils/utils';
import useBalance from './hooks/useBalance';
import { Web3ContextProvider } from './hooks/useWeb3Context';
import Register from './components/Register';
import Login from './components/Login';
import Home from './pages/Home';
import Header from './components/Header';
import Marketplace from './pages/Marketplace';
import Posts from './pages/Posts';
import Sidebar from './components/Sidebar';
import { ethers } from 'ethers';
import { Biconomy } from "@biconomy/mexa";
let biconomy;
import Chat from './components/Chat';
import FriendRequests from './components/FriendRequests';

function App() {
  const [balanceUpdate, setBalanceUpdate] = useState(false);
  const { connector } = useWeb3React();
  const hooks = connectorHooks[getName(connector)];
  const { useAccount, useAccounts, useIsActive, useProvider } = hooks;
  const provider = useProvider();
  const account = useAccount();
  const isActive = useIsActive();
  const accounts = useAccounts();
  const tokenContract = getContract(S2L_ADDRESS, S2L_ABI.abi, provider, account);
  const contract = getContract(MARKETPLACE_ADDRESS, MARKETPLACE_ABI.abi, provider, account);

  const balance = useBalance(
    isActive,
    provider,
    account,
    tokenContract,
    balanceUpdate,
    setBalanceUpdate,
  );
  useEffect(() => {
    const initBiconomy = async () => {
      console.log(import.meta.env.VITE_GASLESS_API_KEY)
      biconomy = new Biconomy(provider.provider, {
        apiKey: import.meta.env.VITE_GASLESS_API_KEY,
        debug: true,
        contractAddresses: [MARKETPLACE_ADDRESS],
      });
      console.log(biconomy)
      await biconomy.init();
    };
    if (account && provider) initBiconomy();
  }, [account, provider]);
  return (
    <Web3ContextProvider
      value={{
        connector,
        provider,
        account,
        isActive,
        accounts,
        tokenContract,
        contract,
        balance,
        biconomy,
        setBalanceUpdate,
      }}
    >
      <BrowserRouter>
        <div className="wrapper">
          <Header />
          <div className="main d-flex">
            <Sidebar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/marketplace" element={<Marketplace />} />
              <Route path="/posts" element={<Posts />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/chat/:id" element={<Chat />} />
              <Route path="/requests" element={<FriendRequests />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </Web3ContextProvider>
  );
}
export default App;