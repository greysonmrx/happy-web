import React from 'react';

import { FiPower, FiMapPin, FiAlertCircle } from 'react-icons/fi';
import { Link, useLocation } from 'react-router-dom';

import { useAuth } from '../hooks/auth';

import mapMarkerImg from '../images/map-marker.svg';

import '../styles/components/restricted-sidebar.css';

const RestrictedSidebar: React.FC = () => {
  const { signOut } = useAuth();
  const { pathname } = useLocation();

  function handleActiveLink(path: string) {
    if (pathname === path) {
      return "active"
    }

    return "";
  }

  return (
    <aside className="restricted-sidebar">
      <img src={mapMarkerImg} alt="Happy" />

      <div>
        <Link
          to="/orphanages_created"
          className={handleActiveLink("/orphanages_created")}
        >
          <FiMapPin
            size={24}
          />
        </Link>
        <Link
          to="/orphanages_pending"
          className={handleActiveLink("/orphanages_pending")}
        >
          <FiAlertCircle
            size={24}
          />
        </Link>
      </div>

      <footer>
        <button type="button" onClick={signOut}>
          <FiPower size={24} color="#FFF" />
        </button>
      </footer>
    </aside>
  );
}

export default RestrictedSidebar;
