import { useState, useEffect } from "react";
import "./Modal.css";

const Modal = ({ setModalOpen, contract }) => {
  const [selectedAddress, setSelectedAddress] = useState("");

  const shareAccess = async () => {
    await contract.allow(selectedAddress);
    setModalOpen(false);
    console.log("shared");
  };

  const revokeAccess = async () => {
    await contract.disallow(selectedAddress);
    setModalOpen(false);
    console.log("access revoked");
  };

  useEffect(() => {
    const accessList = async () => {
      const addressList = await contract.shareAccess();
      let select = document.querySelector("#selectNumber");
      select.innerHTML = "";

      const options = addressList;
      for (let i = 0; i < options.length; i++) {
        let opt = options[i];
        let e1 = document.createElement("option");
        e1.textContent = opt;
        e1.value = opt;
        select.appendChild(e1);
      }
    };

    contract && accessList();
  }, [contract]);

  return (
    <>
      <div className="modalBackground">
        <div className="modalContainer">
          <div className="title">Share with / Revoke Access from</div>
          <div className="body">
            <input
              type="text"
              className="address"
              placeholder="Enter Address"
              value={selectedAddress}
              onChange={(e) => setSelectedAddress(e.target.value)}
            ></input>
          </div>
          <form id="myForm">
            <select id="selectNumber">
              <option className="address">People With Access</option>
            </select>
          </form>
          <div className="footer">
            <button
              onClick={() => {
                setModalOpen(false);
              }}
              id="cancelBtn"
            >
              Cancel
            </button>
            <button onClick={shareAccess}>Share</button>
            <button onClick={revokeAccess}>Revoke Access</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
