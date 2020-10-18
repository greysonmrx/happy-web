import React from 'react';
import { Link } from 'react-router-dom';
import { IoMdArrowRoundForward } from 'react-icons/io';

import logoImg from '../images/logo.svg';

import '../styles/pages/landing.css';

const Landing: React.FC = () => {
  return (
    <div id="page-landing">
      <div className="content-wrapper">
        <div className="left-header">
          <img src={logoImg} alt="Happy"/>

          <div className="location">
            <strong>Palmeira dos Índios</strong>
            <span>Alagoas</span>
          </div>
        </div>

        <main>
          <h1>Leve felicidade para o mundo</h1>
          <p>Visite orfanatos e mude o dia de muitas crianças.</p>
        </main>

        <Link to="/login" className="restricted-access">
          Acesso restrito
        </Link>


        <Link to="/app" className="enter-app">
          <IoMdArrowRoundForward size={33} color="rgba(0, 0, 0, 0.45)" />
        </Link>
      </div>
    </div>
  );
}

export default Landing;
