import React from 'react';

import Routes from './routes';

import AppProvider from './hooks';

import './styles/global.css';
import 'leaflet/dist/leaflet.css';

const App: React.FC = () => {
  return (
    <AppProvider>
      <Routes />
    </AppProvider>
  );
}

export default App;
