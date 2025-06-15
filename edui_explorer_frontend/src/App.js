import React from 'react';
import './App.css';
import AppContainer from './components/AppContainer';

// PUBLIC_INTERFACE
function App() {
  /**
   * Top-level App layout with navbar and AppContainer 
   */
  return (
    <div className="app">
      <nav className="navbar">
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
            <div className="logo">
              <span className="logo-symbol">*</span> KAVIA AI
            </div>
            <button className="btn" tabIndex={0}>Help</button>
          </div>
        </div>
      </nav>
      <main>
        <AppContainer />
      </main>
    </div>
  );
}

export default App;