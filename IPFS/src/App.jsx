import axios from 'axios';
import React, { useState } from 'react';
import { Document } from 'react-pdf'
import dotenv from 'dotenv'

dotenv.config()


const App = () => {
  const [file, setFile] = useState(null);
  const [fileUrl, setFileUrl] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const fileData = new FormData();
      fileData.append('file', file);

      //UPLOAD

      const responseData = await axios({
        method: 'post',
        url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
        data: fileData,
        headers: {
          pinata_api_key: process.env.API_KEY,
          pinata_secret_api_key: process.env.SECRET_KEY,
          "Content-Type": "multipart/form-data",
        }
      });

      //DOWNLOAD

      const fileUrl = "https://gateway.pinata.cloud/ipfs/" + responseData.data.IpfsHash;
      setFileUrl(fileUrl);


    } catch (error) {
      console.log(error);

    }
  };

  return (
    <div>
      <h1>IPFS - Uploading</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <button type="submit">Upload</button>
      </form>
      {
        fileUrl && (
          // <img 
          //   src={fileUrl} 
          //   alt="Preview" 
          //   style={{ maxWidth: '100%', maxHeight: '300px' }} // images
          // />
          <a href={fileUrl}>PDF ViEW</a>// DOWNLOAD FILE (PDF,TXT etc.)

        )
      }
    </div>
  );
};

export default App;
