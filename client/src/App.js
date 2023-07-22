import Upload from "./artifacts/contracts/Upload.sol/Upload.json";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import FileUpload from "./components/FileUpload";
import Display from "./components/Display";
import Model from "./components/Modal";
import "./App.css";

function App() {
  const [account, setAccount] = useState("");//initially set to an empty string
  const [contract, setContract] = useState(null);//state variable is used to store a reference to the smart contract 
  const [provider, setProvider] = useState(null);
  const [ModelOpen, setModalOpen] = useState(false);

  // to interact witn smart contract
  useEffect(() => {
    const provider = new ethers.providers.Web3Provider(window.ethereum); //provider is usefull in reading data from Block chain

    const loadProvider = async () => {
      if (provider) {
        window.ethereum.on("chainChanged", () => {
          window.location.reload();
        });

        window.ethereum.on("accountsChanged", () => {
          window.location.reload();
        });
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner(); //singer is used for writting data in block chain
        const address = await signer.getAddress();
        setAccount(address);
        // let contractAddress = "Your Contract Address Here";
        let contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

        // instance of the contract
        const contract = new ethers.Contract(
          contractAddress,
          Upload.abi,
          signer
        );
        // console.log(contract);
        setContract(contract);
        setProvider(provider);
      } else {
        console.error("Metamask is not installed");
      }
    };
    provider && loadProvider();
  }, []);
  return (
    <>
      {!ModelOpen && (
        <button className="share" onClick={() => setModalOpen(true)}>
          Share
        </button>
      )}
      {ModelOpen && (
        <Model setModalOpen={setModalOpen} contract={contract}></Model>
      )}

      <div className="App">
        <h1 style={{ family: "Arial" }}>Decentralized Cloud Storage</h1>
        <div class="bg"></div>
        <div class="bg bg2"></div>
        <div class="bg bg3"></div>

        <p style={{ family: "Arial" }}>
          Account : {account ? account : "Not connected"}
        </p>
        <FileUpload
          account={account}
          provider={provider}
          contract={contract}
        ></FileUpload>
        <Display contract={contract} account={account}></Display>
      </div>
    </>
  );
}

export default App;