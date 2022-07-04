import './App.css';
import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { abi } from './abi';
import ContractUse from './ContractUse';

const cAdd = "0x8c325Dc463BBbC62eF5dE67A2F6B034e04215c23"

function App() {

  const [add, setAdd] = useState("")
  const [isLoaded, setIsLoaded] = useState(false)

  const [provider, setProvider] = useState(null)
  const [signer, setSigner] = useState(null)
  const [contract, setContract] = useState(null)

  const requestAccount = async () => {

  }

  const connectWallet = async () => {
    if (!window.ethereum)
      console.log("Could not find metamask")


    window.ethereum.request({
      method: "eth_requestAccounts"
    }).then((result) => {
      console.log(result)
      accountChangeHandler(result[0])

    })
  }

  const accountChangeHandler = (newAccount) => {
    setAdd(newAccount)
    setIsLoaded(true)
    updateEthers();
  }

  const updateEthers = () => {
    let tempProvider = new ethers.providers.Web3Provider(window.ethereum)
    setProvider(tempProvider)

    let tempSigner = tempProvider.getSigner();
    setSigner(tempSigner);

    let tempContract = new ethers.Contract(cAdd, abi, tempSigner)
    setContract(tempContract)
  }


  return (
    <div className="App">
      <h1 style={{ fontSize: "80px", }}>ERC-20 Frontend</h1>

      <div>
        {!isLoaded ?
          <button className="connect" onClick={connectWallet}>Connect to Metamask</button>
          :
          <>
            <button className="connect" disabled={true}>Disconnect(to be implemented)</button>
            <h2 style={{ fontWeight: "100" }}>Account Connected: <b style={{ color: "rgb(255, 208, 0)" }}>{add}</b></h2>
            <ContractUse contract={contract} provider={provider} signer={signer} address={add} />
          </>
        }
      </div>
    </div>
  );
}

export default App;
