
// import React, { useEffect } from 'react';
// import UAParser from 'ua-parser-js';

// function UserInfo() {
//   useEffect(() => {
//     const userAgentParser = new UAParser();

//     const userAgentData = userAgentParser.getResult();

//     const browserName = userAgentData.browser.name;
//     const browserVersion = userAgentData.browser.version;
//     const osName = userAgentData.os.name;
//     const deviceType = userAgentData.device.type;

//     console.log(`Browser: ${browserName} ${browserVersion}`);
//     console.log(`OS: ${osName}`);
//     console.log(`Device Type: ${deviceType}`);

//     // Send user agent data to the backend
//     fetch('/api/user-agent', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         browserName,
//         browserVersion,
//         osName,
//         deviceType,
//       }),
//     });
//   }, []);

//   return (
//     <div>
//       <h1>User Agent Information</h1>
//     </div>
//   );
// }

// export default UserInfo;
import React, { useEffect, useState } from 'react';
import UAParser from 'ua-parser-js';

function UserInfo() {
  const [browserName, setBrowserName] = useState('');
  const [browserVersion, setBrowserVersion] = useState('');
  const [osName, setOsName] = useState('');
  const [deviceType, setDeviceType] = useState('');
  //const SystemInfo = require('./system_info'); // Adjust the path as needed

  

  useEffect(() => {
    const userAgentParser = new UAParser();

    const userAgentData = userAgentParser.getResult();

    setBrowserName(userAgentData.browser.name);
    setBrowserVersion(userAgentData.browser.version);
    setOsName(userAgentData.os.name);
    setDeviceType(userAgentData.device.type);

    fetch('/api/user-agent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        browserName,
        browserVersion,
        osName,
        deviceType,
      }),
    });
  
    
  },
   []
   );
   
   fetch('/api/getIpAddress')
  .then(response => response.json())
  .then(data => {
    console.log(`Client IP Address: ${data.ipAddress}`);
  })
  .catch(error => {
    console.error('Error fetching IP address:', error);
  });


  return (
    <div>
      <h1>User Agent Information</h1>
      <p>Browser: {browserName}</p>
      <p> browserVersion:{browserVersion}</p>
      <p>OS: {osName}</p>
      <p>Device Type: {deviceType}</p>
    </div>
  );
}

export default UserInfo;