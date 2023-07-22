/*
    This file contains the implementation of the fileupload and download files,
    in which download file is still not working properly,so there is somethings 
    in code to be changed. 
*/  


// import { useState } from "react";
// import axios from "axios";
// import "./FileUpload.css";

// const FileUpload = ({ contract, account, provider }) => {
//   const [file, setFile] = useState(null);
//   const [fileName, setFileName] = useState("No file selected");

//   // e is the event object that is passed as an argument to the handleSubmit function.
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (file) {
//       try {
//         const formData = new FormData();
//         formData.append("file", file);

//         const resFile = await axios({
//           method: "post",
//           url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
//           data: formData,
//           headers: {
//             pinata_api_key: `1761b3659bd5ce20238b`,
//             pinata_secret_api_key: `fbd70d17f5e0fd3d62c06868d10df08031ad601985c767f7fa2bce0a3651e928`,
//             "Content-Type": "multipart/form-data",
//           },
//         });

//         const ImgHash = `https://gateway.pinata.cloud/ipfs/${resFile.data.IpfsHash}`;
//         //if upload is successfull then the IPFSHash is added to the smart contract
//         contract.add(account,ImgHash);
//         alert("Successfully file Uploaded");
//         //Take a look at Pinata Pinned section, you will see a new file added to list.
//         console.log(ImgHash);
//         setFileName("No file selected");
//         setFile(null); //to again disable the upload button after upload

//       } catch (e) {
//         console.error(`Error uploading file: ${e.message}`);
//         alert("Unable to upload file to pinata. Please try again.");
//       }
//     }
//     alert("Successfully file Uploaded");
//     setFileName("No file selected");
//     setFile(null); //to again disable the upload button after upload
//   };

//   // retrieveFile function is called when the user selects a file to upload.
//   // It reads the contents of the file and sets the file state variable to the selected file.
//   const retrieveFile = (e) => {
//     const data = e.target.files[0]; //files array of files object
//     // console.log(data);
//     const reader = new window.FileReader();
//     reader.readAsArrayBuffer(data);
//     reader.onloadend = () => {
//       setFile(e.target.files[0]);
//     };
//     setFileName(e.target.files[0].name);
//     e.preventDefault();
//   };

// // downloadFile function is called when the user clicks on the download button.
// // It retrieves the IPFS hash of the selected file from the smart contract and
// // downloads the corresponding file from the IPFS network.
// const handleDownload = async (url) => {
//   try {
//     const files = await contract.display(account).call();
//     if (files.length === 0) {
//       alert("No files found!");
//       return;
//     }
//     const selectedFile = files[0]; // Download the first file in the list
//     const res = await axios({
//       method: "get",
//       url: selectedFile,
//       responseType: "blob",
//     });
//     // Create blob link to download file
//     const urlBlob = window.URL.createObjectURL(res.data);
//     const link = document.createElement("a");
//     link.href = urlBlob;
//     link.setAttribute("download", fileName);
//     document.body.appendChild(link);
//     link.click();
//     link.remove();
//   } catch (e) {
//     console.error(`Error downloading file: ${e.message}`);
//     alert("Unable to download file. Please try again.");
//   }
// };

//  return (
//   <div className="top">
//     <form className="form" onSubmit={handleSubmit}>
//       <label htmlFor="file-upload" className="choose">
//         Choose File
//       </label>
//       <input
//         disabled={!account}
//         type="file"
//         id="file-upload"
//         name="data"
//         onChange={retrieveFile}
//       />
//       <span className="textArea">File: {fileName}</span>
//       <button type="submit" className="upload" disabled={!file}>
//         Upload File
//       </button>
//     </form>

//     {/* Download button */}
//     <div className="download-container">
//       <button
//         className="download"
//         onClick={async () => {
//           try {
//             const files = await contract.display(account).call();
//             if (files.length === 0) {
//               alert("No files found!");
//               return;
//             }
//             const selectedFile = files[0]; // Download the first file in the list
//             const response = await axios.get(selectedFile);
//             const url = window.URL.createObjectURL(new Blob([response.data]));
//             const link = document.createElement("a");
//             link.href = url;
//             link.setAttribute("download", selectedFile.substring(selectedFile.lastIndexOf("/") + 1));
//             document.body.appendChild(link);
//             link.click();
//           } catch (e) {
//             console.error(`Error downloading file: ${e.message}`);
//             alert("Unable to download file. Please try again.");
//           }
//         }}
//       >
//         Download
//       </button>
//     </div>
//   </div>
// );
// };
// export default FileUpload;
