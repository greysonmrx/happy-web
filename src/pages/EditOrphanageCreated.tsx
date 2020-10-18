import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';

import { LeafletMouseEvent } from 'leaflet';
import { useHistory, useParams } from 'react-router-dom';
import { CgClose } from 'react-icons/cg';
import { FiPlus } from 'react-icons/fi';
import { Map, Marker, TileLayer } from 'react-leaflet';

import Sidebar from '../components/Sidebar';

import api from '../services/api';

import happyMapIcon from '../utils/mapIcon';

import { Orphanage } from './Orphanage';

import '../styles/pages/edit-orphanage-created.css';

interface Position {
  latitude: number;
  longitude: number;
}

interface EditOrphanageCreatedParams {
  id: string;
}

const EditOrphanageCreated: React.FC = () => {
  const history = useHistory();
  const { id } = useParams<EditOrphanageCreatedParams>();

  const [name, setName] = useState('');
  const [about, setAbout] = useState('');
  const [instructions, setInstructions] = useState('');
  const [openingHours, setOpeningHours] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [openOnWeekends, setOpenOnWeekends] = useState(true);
  const [previewImages, setPreviewImages] = useState<Array<string>>([]);
  const [position, setPosition] = useState<Position>({ latitude: 0, longitude: 0 });

  function handleRemoveImage(imageIndex: number) {
    setPreviewImages(oldState => oldState.filter((_, index) => index !== imageIndex));
  }

  function handleSelectImages(event: ChangeEvent<HTMLInputElement>) {
    if (!event.target.files) {
      return;
    }

    const selectedImagesPreview = Array.from(event.target.files).map(selectedImage => {
      return URL.createObjectURL(selectedImage);
    });

    setPreviewImages(selectedImagesPreview);
  }

  function handleMapClick(event: LeafletMouseEvent) {
    const { lat, lng } = event.latlng;

    setPosition({ latitude: lat, longitude: lng });
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    try {
      if (!position) {
        return;
      }

      const { latitude, longitude } = position;

      await api.put(`/orphanages/created/${id}`, {
        name,
        about,
        latitude,
        longitude,
        instructions,
        opening_hours: openingHours,
        whatsapp,
        open_on_weekends: String(openOnWeekends),
      });

      history.push('/orphanages_created');
    } catch(err) {
      alert(err.response?.data.message || 'Eita! Ocorreu um erro!');
    }
  }

  useEffect(() => {
    (async () => {
      try {
        const response = await api.get<Orphanage>(`/orphanages/created/${id}`);

        setName(response.data.name);
        setAbout(response.data.about);
        setInstructions(response.data.instructions);
        setOpeningHours(response.data.opening_hours);
        setWhatsapp(response.data.whatsapp);
        setOpenOnWeekends(response.data.open_on_weekends);
        setPosition({
          latitude: response.data.latitude,
          longitude: response.data.longitude
        });
        setPreviewImages(response.data.images.map(image => image.url));
      } catch(err) {
        alert(err.response?.data.message || 'Eita! Ocorreu um erro!');
      }
    })()
  }, [id]);

  return (
    <div id="page-edit-orphanage-created">
      <Sidebar />

      <main>
        <div className="wrapper">
          <h3>Editar perfil de {name}</h3>

          <form onSubmit={handleSubmit} className="edit-orphanage-created-form">
            <fieldset>
              <legend>Dados</legend>

              <Map
                center={[position.latitude, position.longitude]}
                style={{ width: '100%', height: 280 }}
                zoom={15}
                onclick={handleMapClick}
              >
                <TileLayer
                  url={`https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
                />

                {position && (
                  <Marker
                    interactive={false}
                    icon={happyMapIcon}
                    position={[
                      position.latitude,
                      position.longitude
                    ]}
                  />
                )}
              </Map>

              <div className="input-block">
                <label htmlFor="name">Nome</label>
                <input
                  id="name"
                  value={name}
                  onChange={event => setName(event.target.value)}
                />
              </div>

              <div className="input-block">
                <label htmlFor="about">Sobre <span>Máximo de 300 caracteres</span></label>
                <textarea
                  id="about"
                  maxLength={300}
                  value={about}
                  onChange={event => setAbout(event.target.value)}
                />
              </div>

              <div className="input-block">
                <label htmlFor="whatsapp">Número de Whatsapp</label>
                <input
                  id="whatsapp"
                  type="text"
                  value={whatsapp}
                  onChange={event => setWhatsapp(event.target.value)}
                />
              </div>

              <div className="input-block">
                <label htmlFor="images">Fotos</label>

                <div className="images-container">
                  {
                    previewImages.map((previewImage, index) => (
                      <div key={previewImage} className="preview">
                        <img src={previewImage} alt={name}/>
                        <button type="button" onClick={() => handleRemoveImage(index)}>
                          <CgClose size={22} color="#FF669D"/>
                        </button>
                      </div>
                    ))
                  }
                  <label htmlFor="images[]" className="new-image">
                    <FiPlus size={24} color="#15b6d6" />
                  </label>

                  <input multiple type="file" name="images[]" id="images[]" onChange={handleSelectImages}/>
                </div>
              </div>
            </fieldset>

            <fieldset>
              <legend>Visitação</legend>

              <div className="input-block">
                <label htmlFor="instructions">Instruções</label>
                <textarea
                  id="instructions"
                  value={instructions}
                  onChange={event => setInstructions(event.target.value)}
                />
              </div>

              <div className="input-block">
                <label htmlFor="opening_hours">Horário das visitas</label>
                <input
                  id="opening_hours"
                  value={openingHours}
                  onChange={event => setOpeningHours(event.target.value)}
                />
              </div>

              <div className="input-block">
                <label htmlFor="open_on_weekends">Atende fim de semana</label>

                <div className="button-select">
                  <button
                    type="button"
                    className={openOnWeekends ? "active-green" : ""}
                    onClick={() => setOpenOnWeekends(true)}
                  >
                    Sim
                  </button>
                  <button
                    type="button"
                    className={!openOnWeekends ? "active-red" : ""}
                    onClick={() => setOpenOnWeekends(false)}
                  >
                    Não
                  </button>
                </div>
              </div>
            </fieldset>

            <button className="confirm-button" type="submit">
              Confirmar
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}

export default EditOrphanageCreated;
