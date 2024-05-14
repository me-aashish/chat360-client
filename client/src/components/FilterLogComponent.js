import React, { useState } from 'react';
import axios from 'axios';
import "../index.css"
import { BASE_URL } from '../constants/BASE_URL';

function FilterLogComponent(){
  const [logLevel, setLogLevel] = useState("");
  const [logMessage, setLogMessage] = useState("");
  const [logMetadata, setLogMetadata] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [filteredLogs, setFilteredLogs] = useState([]);
  const [errorMsg, setError] = useState("");

  const handleFilterLogsByLogLevel = async() => {
    try {
      console.log(BASE_URL);
        const response = await axios.get(`${BASE_URL}/api/v1/filter`, {
            params: {
                property: 'log_level',
                value: logLevel,
            }
        
        })
        setFilteredLogs(response.data.result);
    } catch (error) {
        setError('Error filtering logs:', error.message);
        console.error('Error filtering logs:', error);
    }
   
  };

  const handleFilterLogsByTimestamp = async() => {
     try {
        const startTimestamp = new Date(startTime).getTime();
        const endTimestamp = new Date(endTime).getTime();
        if(startTimestamp > endTimestamp) alert("Start time should be less than or equal to End time")
        const response = await axios.get(`${BASE_URL}/api/v1/filter/timestamp`, {
            params: {
                property: 'timestamp',
                startTimeValue: startTime,
                endTimeValue: endTime
            }
        
        })
        setFilteredLogs(response.data.result);
    } catch (error) {
        setError('Error filtering logs:', error.message);
        console.error('Error filtering logs:', error);
    }
  };

  const handleFilterLogsByMessage = async() => {
    try {
        const response = await axios.get(`${BASE_URL}/api/v1/filter`, {
            params: {
                property: 'log_message',
                value: logMessage,
            }
        
        })
        setFilteredLogs(response.data.result);
    } catch (error) {
        setError('Error filtering logs:', error.message);
        console.error('Error filtering logs:', error);
    }
  };

  const handleFilterLogsByMetadataSource = async() => {
    try {
        const response = await axios.get(`${BASE_URL}/api/v1/filter`, {
            params: {
                property: 'metadata',
                value: logMetadata,
            }
        
        })
        setFilteredLogs(response.data.result);
    } catch (error) {
        setError('Error filtering logs:', error.message);
        console.error('Error filtering logs:', error);
    }
  };

  return (
    <div>
      <h1>Log Filter</h1>
      <div className="logFilterContainer">
        <label>Log Level:</label>
        <input type="text" value={logLevel} onChange={(e) => setLogLevel(e.target.value)} /> 
        <button onClick={handleFilterLogsByLogLevel}>Filter Logs</button>
      </div>
      <div className="logFilterContainer">
        <label>Log Message/String:</label>
        <input type="text" value={logMessage} onChange={(e) => setLogMessage(e.target.value)} />
        <button onClick={handleFilterLogsByMessage}>Filter Logs</button>
      </div>
      <div className="logFilterContainer">
        <label>Log Metadata Source:</label>
        <input type="text" value={logMetadata} onChange={(e) => setLogMetadata(e.target.value)} />
        <button onClick={handleFilterLogsByMetadataSource}>Filter Logs</button>
      </div>
      <div className="logFilterContainer">
        <label>Start Time:</label>
        <input type="text" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
        <div>
             <label>End Time:</label>
            <input type="text" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
        </div>
        <button onClick={handleFilterLogsByTimestamp}>Filter Logs</button>
      </div>

      
      <h2>Filtered Logs:{filteredLogs.length}</h2>
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

export default FilterLogComponent;


