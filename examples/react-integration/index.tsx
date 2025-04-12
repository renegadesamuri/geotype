import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

/**
 * Entry point for the React example application
 * 
 * In a real application, this would be properly bundled
 * with a tool like webpack, Vite, or Create React App.
 */

// Create root container for React
const rootElement = document.getElementById('root');

if (!rootElement) {
  console.error('Root element not found. Make sure there is a div with id "root" in your HTML.');
} else {
  // Create React root and render the App
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
