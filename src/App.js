import './App.css'
import React from 'react'
import AppHeader from './components/AppHeader'
import InfoBox from './components/InfoBox'

function App() {

  return (
    <div className="App">
      <AppHeader />
      <div className='app-stats'>
      <InfoBox title="Coronavirus Cases" cases={123} total={2000} />
      <InfoBox title="Recovered" cases={123} total={2000} />
      <InfoBox title="Deaths" cases={123} total={2000} />
      </div>
    </div>
  );
}

export default App;
