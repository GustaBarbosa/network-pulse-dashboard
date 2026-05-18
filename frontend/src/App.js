import { useState } from 'react';
import './App.css';

const IP_REGEX = /^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;

function App() {
  const [ipInput, setIpInput] = useState('');
  const [scanResults, setScanResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const triggerScan = async (e) => {
    e.preventDefault();
    setErrorMsg(''); 
    setScanResults([]);

    if (!ipInput) {
      setErrorMsg("Please enter a valid IP address");
      return;
    }

    if (!IP_REGEX.test(ipInput)) {
      setErrorMsg("invalid IP address format. Must be a real IP between 0 and 255");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`http://localhost:5000/api/scan?ip=${ipInput}`);
      const data = await response.json();
      
      if (response.status === 400) {
        setErrorMsg(`security block (Backend): ${data.error}`);
      } else {
        setScanResults(data);
      }
    } catch (error) {
      setErrorMsg("It was not possible to connect to the backend server");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Network Pulse Dashboard</h1>
        <p>Infrastructure Security Scanner - Ping IP</p>
        
        <form onSubmit={triggerScan} className="scan-form">
          <input 
            type="text" 
            placeholder="Ex: 8.8.8.8" 
            value={ipInput}
            onChange={(e) => setIpInput(e.target.value)}
            disabled={loading}
            className="ip-input"
          />
          <button 
            type="submit"
            className={`scan-btn ${loading ? 'disabled' : ''}`} 
            disabled={loading}
          >
            {loading ? 'A Varrer...' : 'Ping IP'}
          </button>
        </form>

        {errorMsg && (
          <div className="security-alert animate-fade-in">
            <div className="alert-content">
              <strong>system alert:</strong> {errorMsg}
            </div>
            <button className="close-alert-btn" onClick={() => setErrorMsg('')}>&times;</button>
          </div>
        )}
      </header>

      <main className="dashboard-grid">
        {scanResults.map((device, index) => (
          <div key={index} className={`device-card ${device.status}`}>
            <h3>{device.ip}</h3>
            <p className="status-text">
              Status: <strong>{device.status.toUpperCase()}</strong>
            </p>
            <p className="latency-text">
              Latency: <span>{device.latency}</span>
            </p>
          </div>
        ))}
      </main>
    </div>
  );
}

export default App;