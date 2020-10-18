import React from 'react';

import { Link, useHistory, useParams } from 'react-router-dom';

import api from '../services/api';

import orphanageDeletedImg from '../images/orphanage-deleted.svg';

import '../styles/pages/orphanage-deleted.css';

interface OrphanageDeletedParams {
  id: string;
  name: string;
}

const OrphanageDeleted: React.FC = () => {
  const history = useHistory();
  const { id, name } = useParams<OrphanageDeletedParams>();

  async function handleRemoveOrphanage() {
    try {
      await api.delete(`/orphanages/created/${id}`);

      history.push('/orphanages_created');
    } catch(err) {
      alert(err.response?.data.message || 'Eita! Ocorreu um erro!');
    }
  }

  return (
    <div id="page-orphanage-deleted">
      <main>
        <div>
          <h1>Excluir!</h1>
          <p>Você tem certeza que quer excluir {name}?</p>
          <button
            className="button outlined"
            type="button"
            onClick={handleRemoveOrphanage}
          >
            Sim, eu quero
          </button>
          <Link
            className="button default"
            to="/orphanages_created"
          >
            Não, eu não quero
          </Link>
        </div>
        <img src={orphanageDeletedImg} alt="Excluir orfanato"/>
      </main>
    </div>
  );
}

export default OrphanageDeleted;
