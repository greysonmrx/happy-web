import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { HiPlus } from 'react-icons/hi';
import { IoMdArrowRoundForward } from 'react-icons/io';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';

import mapMarkerImg from '../images/map-marker.svg';

import happyMapIcon from '../utils/mapIcon';

import api from '../services/api';

import '../styles/pages/orphanages-map.css';

interface Orphanage {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
}

const OrphanagesMap: React.FC = () => {
  const [orphanages, SetOrphanages] = useState<Array<Orphanage>>([]);
  const [initialPosition, setInitialPosition] = useState<[number, number]>([0, 0]);

  async function handleFetchOrphanages() {
    try {
      const response = await api.get('/orphanages/created');

      SetOrphanages(response.data);
    } catch(err) {
      alert(err.response?.data.message || 'Eita! Ocorreu um erro!');
    }
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(position => {
      const { latitude, longitude } = position.coords;

      setInitialPosition([latitude, longitude]);
    }, (err) => console.log(err));

    handleFetchOrphanages();
  }, []);

  useEffect(() => console.log(orphanages), [orphanages]);

  return (
    <div id="page-map">
      <aside>
        <header>
          <img src={mapMarkerImg} alt="Happy"/>

          <h2>Escolha<br /> um orfanato do mapa</h2>
          <p>Muitas crianças estão<br /> esperando a sua visita :)</p>
        </header>

        <footer>
          <strong>Palmeira dos Índios</strong>
          <span>Alagoas</span>
        </footer>
      </aside>

      <Map
        center={[initialPosition[0], initialPosition[1]]}
        zoom={15}
        style={{ width: '100%', height: '100%' }}
      >
        <TileLayer
          url={`https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
        />
        {
          orphanages.map(orphanage => (
            <Marker
              key={orphanage.id}
              icon={happyMapIcon}
              position={[orphanage.latitude, orphanage.longitude]}
            >
              <Popup closeButton={false} minWidth={240} maxWidth={240} className="map-popup">
                {orphanage.name}
                <Link to={`/orphanages/view/${orphanage.id}`} >
                  <IoMdArrowRoundForward
                    size={20}
                    color="#FFFFFF"
                  />
                </Link>
              </Popup>
            </Marker>
          ))
        }
      </Map>

      <Link to="/orphanages/create" className="create-orphanage">
        <HiPlus size={30} color="#ffffff" />
      </Link>
    </div>
  );
}

export default OrphanagesMap;
