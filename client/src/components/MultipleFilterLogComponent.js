import React, { useState } from 'react';
import axios from 'axios';
import "../index.css"
import { BASE_URL } from '../constants/BASE_URL';

function MultiFilterLogComponent(){
  const [logLevel, setLogLevel] = useState("");
  const [logMessage, setLogMessage] = useState("");
  const [logMetadata, setLogMetadata] = useState("");
  const [filteredLogs, setFilteredLogs] = useState([]);
  const [errorMsg, setError] = useState("");

  const handleMultiFilter = async() => {
    if(!logLevel || !logMessage || !logMetadata){
      alert("please add any one of the fields")
    }
    const postBody = [];

    if (logLevel) {
        postBody.push({
        property: "log_level",
        value: logLevel,
        });
    }
    if (logMessage) {
        postBody.push({
        property: "log_message",
        value: logMessage,
        });
    }
    if (logMetadata) {
        postBody.push({
        property: "metadata",
        value: logMetadata,
        });
    }     
    try {
        const response = await axios.post(`${BASE_URL}/api/v1/multiple-filter`, postBody);
        setFilteredLogs(response.data.result);
    } catch (error) {
        setError('Error filtering logs:', );
        console.error('Error filtering logs:', error);
    }
   
  };

  

  return (
    <div>
      <h1>Mutli-Filter Log </h1>
      <div className="logFilterContainer">
        <label>Log Level:</label>
        <input type="text" value={logLevel} onChange={(e) => setLogLevel(e.target.value)} /> 
      </div>
      <div className="logFilterContainer">
        <label>Log Message/String:</label>
        <input type="text" value={logMessage} onChange={(e) => setLogMessage(e.target.value)} />
      </div>
      <div className="logFilterContainer">
        <label>Log Metadata Source:</label>
        <input type="text" value={logMetadata} onChange={(e) => setLogMetadata(e.target.value)} />
      </div>
      <button onClick={handleMultiFilter}>Filter Logs</button>

      
      <h2>Filtered Logs:{filteredLogs.length}</h2>
      {console.log(filteredLogs)}
<ul>
  {errorMsg ? <div>{errorMsg}</div> :  filteredLogs.map((log, index) => (
    <li key={index}>
      <div>
        <strong>log_level:</strong> {log.log_level}
      </div>
      <div>
        <strong>log_message:</strong> {log.log_message}
      </div>
      <div>
        <strong>timestamp:</strong> {log.timestamp}
      </div>
      <div>
        <strong>metadata:</strong> {JSON.stringify(log.metadata)}
      </div>
      <hr /> {/* Add a horizontal line between each log entry */}
    </li>
  ))}
</ul>
    </div>
  );
}

export default MultiFilterLogComponent;


