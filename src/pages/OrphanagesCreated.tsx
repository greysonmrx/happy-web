import React, { useEffect, useState } from 'react';

import RestrictedSidebar from '../components/RestrictedSideBar';
import OrphanageCard, { Data as Orphanage } from '../components/OrphanageCard';

import api from '../services/api';

import noOrphanagesImg from '../images/no-orphanages.svg';

import '../styles/pages/orphanages-created.css';

const OrphanagesCreated: React.FC = () => {
  const [orphanages, setOrphanages] = useState<Array<Orphanage>>([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await api.get('/orphanages/created');

        setOrphanages(response.data);
      } catch(err) {
        alert(err.response?.data.message || 'Eita! Ocorreu um erro!');
      }
    })()
  }, []);

  return (
    <div className="page-orphanages-created">
      <RestrictedSidebar />

      <main>
        <div className="wrapper">
          <header>
            <h1>Orfanatos Cadastrados</h1>
            <span>{orphanages.length} orfanatos</span>
          </header>
          {
            orphanages.length > 0 ? (
              <div className="orphanages">
                {
                  orphanages.map(orphanage => (
                    <OrphanageCard
                      key={orphanage.id}
                      data={orphanage}
                    />
                  ))
                }
              </div>
            ) : (
              <div className="no-orphanages">
                <img src={noOrphanagesImg} alt="Nenhum no momento"/>
                <h3>Nenhum no momento</h3>
              </div>
            )
          }
        </div>
      </main>
    </div>
  );
}

export default OrphanagesCreated;
