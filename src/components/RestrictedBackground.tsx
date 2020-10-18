import React from 'react';

import logoRestrictedImg from '../images/logo-restricted.svg';

import '../styles/components/restricted-background.css';

const RestrictedBackground: React.FC = () => {
  return (
    <div id="restricted-background">
      <img src={logoRestrictedImg} alt="Happy"/>
      <div>
        <strong>Palmeira dos Índios</strong>
        <span>Alagoas</span>
      </div>
    </div>
  );
}

export default RestrictedBackground;
