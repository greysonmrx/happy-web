import React, { useEffect, useState } from 'react';

import RestrictedSidebar from '../components/RestrictedSideBar';
import OrphanageCard, { Data as Orphanage } from '../components/OrphanageCard';

import api from '../services/api';

import noOrphanagesImg from '../images/no-orphanages.svg';

import '../styles/pages/orphanages-pending.css';

const OrphanagesPending: React.FC = () => {
  const [orphanages, setOrphanages] = useState<Array<Orphanage>>([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await api.get('/orphanages/pending');

        setOrphanages(response.data);
      } catch(err) {
        alert(err.response?.data.message || 'Eita! Ocorreu um erro!');
      }
    })()
  }, []);

  return (
    <div className="page-orphanages-pending">
      <RestrictedSidebar />

      <main>
        <div className="wrapper">
          <header>
            <h1>Cadastros Pendentes</h1>
            <span>{orphanages.length} orfanatos</span>
          </header>
          {
            orphanages.length ? (
              <div className="orphanages">
                {
                  orphanages.map(orphanage => (
                    <OrphanageCard
                      key={orphanage.id}
                      type="pending"
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

export default OrphanagesPending;
