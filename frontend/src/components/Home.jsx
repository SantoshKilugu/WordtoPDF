import React, { useState } from 'react';
import { FaFileWord } from 'react-icons/fa';
import axios from 'axios';

function Home() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [convertMessage, setConvertMessage] = useState(null);
  const [downloadError, setDownloadError] = useState('');

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

 const handleSubmit = async (event) => {
  event.preventDefault();

  if (!selectedFile) {
    setConvertMessage('Please select a file');
    return;
  }

  const formData = new FormData();
  formData.append('file', selectedFile);

  try {
    const response = await axios.post('http://localhost:5555/convertFile', formData, {
      responseType: 'blob',
    });

    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', selectedFile.name.replace(/\.[^/.]+$/, '') + '.pdf');
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    window.URL.revokeObjectURL(url);

    setSelectedFile(null);
    setConvertMessage('File Converted Successfully');
    setDownloadError('');
  } catch (error) {
    //console.log(error);
    if (error.response && error.response.status === 400) {
      setDownloadError('Error Occurred: ' + error.response.data.message);
    } else {
      setDownloadError('An unexpected error occurred.');
    }
    setConvertMessage('');
  }
};

  return (
    <div className="max-w-screen-2xl mx-auto container px-6 py-3 md:px-40 bg-green-300">
      <div className="flex h-screen items-center justify-center">
        <div className="border-2 border-dashed px-4 py-2 md:px-8 md:py-6 border-indigo-400 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold text-red-600 text-center mb-4">Convert Word To PDF</h1>
          <p className="text-sm text-center mb-5">
            Easily convert the documents to PDF without needing external software
          </p>
          <div className="flex flex-col items-center space-y-4">
            <input
              type="file"
              accept=".doc,.docx"
              onChange={handleFileChange}
              className="hidden"
              id="FileInput"
            />
            <label
              htmlFor="FileInput"
              className="w-full flex items-center justify-center px-4 py-6 bg-gray-100 text-gray-700 rounded-lg shadow-lg cursor-pointer border-blue-300 hover:bg-blue-700 duration-300 hover:text-white"
            >
              <FaFileWord className="text-2xl mr-3" />
              <span className="text-2xl">{selectedFile ? selectedFile.name : 'Choose File'}</span>
            </label>
            <button
              onClick={handleSubmit}
              disabled={!selectedFile}
              className="text-white bg-blue-500 hover:bg-blue-700 disabled:bg-blue-400 disabled:pointer-events-none duration-300 font-bold px-4 py-2 rounded-lg"
            >
              Convert File
            </button>
            {convertMessage && <div className="text-green-500 text-center font-bold">{convertMessage}</div>}
            {downloadError && <div className="text-red-500 text-center">{downloadError}</div>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;