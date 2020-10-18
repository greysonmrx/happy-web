import React from 'react';

import { Map, Marker, TileLayer } from "react-leaflet";
import { Link } from 'react-router-dom';
import { FiEdit3, FiTrash } from 'react-icons/fi';

import happyMapIcon from '../utils/mapIcon';

import '../styles/components/orphanage-card.css';
import { IoMdArrowRoundForward } from 'react-icons/io';

export type Data = {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
}

interface OrphanageCardProps {
  data: Data;
  type?: "default" | "pending";
}

const OrphanageCard: React.FC<OrphanageCardProps> = ({ data, type = "default" }) => {
  const { id, name, latitude, longitude } = data;

  return (
    <div id="orphanage-card">
      <Map
        center={[latitude, longitude]}
        zoom={16}
        style={{ width: '100%', height: 280 }}
        dragging={false}
        touchZoom={false}
        zoomControl={false}
        scrollWheelZoom={false}
        doubleClickZoom={false}
      >
        <TileLayer
          url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
        />
        <Marker interactive={false} icon={happyMapIcon} position={[latitude, longitude]} />
      </Map>

      <footer>
        <span>{name}</span>
        {
          type === "default" ? (
            <div>
              <Link to={`/orphanages/edit/created/${id}`}>
                <FiEdit3
                  size={24}
                  color="#15C3D6"
                />
              </Link>
              <Link to={`/orphanages/delete/${name}/${id}`}>
                <FiTrash
                  size={24}
                  color="#15C3D6"
                />
              </Link>
            </div>
          ) : (
            <Link to={`/orphanages/edit/pending/${id}`}>
              <IoMdArrowRoundForward
                size={24}
                color="#15C3D6"
              />
            </Link>
          )
        }
      </footer>
    </div>
  );
}

export default OrphanageCard;
