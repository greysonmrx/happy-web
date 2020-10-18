import React from 'react';

import { Link } from 'react-router-dom';

import orphanageCreatedImg from '../images/orphanage-created.svg';

import '../styles/pages/orphanage-created.css';

const OrphanageCreated: React.FC = () => {
  return (
    <div id="page-orphanage-created">
      <main>
        <div>
          <h1>Ebaaa!</h1>
          <p>O cadastro deu certo e foi enviado ao administrador para ser aprovado. Agora é só esperar :)</p>
          <Link to="/app">Voltar para o mapa</Link>
        </div>
        <img src={orphanageCreatedImg} alt="Orfanato criado"/>
      </main>
    </div>
  );
}

export default OrphanageCreated;
