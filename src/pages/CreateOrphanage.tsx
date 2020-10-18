import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Map, Marker, TileLayer } from 'react-leaflet';
import { FiPlus } from 'react-icons/fi';
import { CgClose } from 'react-icons/cg';
import { LeafletMouseEvent } from 'leaflet';

import Sidebar from '../components/Sidebar';

import happyMapIcon from '../utils/mapIcon';

import api from '../services/api';

import '../styles/pages/create-orphanage.css';

interface Position {
  latitude: number;
  longitude: number;
}

const CreateOrphanage: React.FC = () => {
  const history = useHistory();

  const [position, setPosition] = useState<Position | undefined>(undefined);

  const [name, setName] = useState('');
  const [about, setAbout] = useState('');
  const [instructions, setInstructions] = useState('');
  const [openingHours, setOpeningHours] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [openOnWeekends, setOpenOnWeekends] = useState(true);
  const [images, setImages] = useState<Array<File>>([]);
  const [previewImages, setPreviewImages] = useState<Array<string>>([]);

  function handleMapClick(event: LeafletMouseEvent) {
    const { lat, lng } = event.latlng;

    setPosition({ latitude: lat, longitude: lng });
  }

  function handleSelectImages(event: ChangeEvent<HTMLInputElement>) {
    if (!event.target.files) {
      return;
    }

    const selectedImages = Array.from(event.target.files)

    setImages(selectedImages);

    const selectedImagesPreview = selectedImages.map(selectedImage => {
      return URL.createObjectURL(selectedImage);
    });

    setPreviewImages(selectedImagesPreview);
  }

  function handleRemoveImage(imageIndex: number) {
    setImages(oldState => oldState.filter((_, index) => index !== imageIndex));
    setPreviewImages(oldState => oldState.filter((_, index) => index !== imageIndex));
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    try {
      if (!position) {
        return;
      }

      const { latitude, longitude } = position;

      const data = new FormData();

      data.append('name', name);
      data.append('about', about);
      data.append('latitude', String(latitude));
      data.append('longitude', String(longitude));
      data.append('instructions', instructions);
      data.append('opening_hours', openingHours);
      data.append('whatsapp', whatsapp);
      data.append('open_on_weekends', String(openOnWeekends));

      images.forEach(image => data.append('images', image));

      await api.post('/orphanages', data);

      history.push('/orphanages/created');
    } catch(err) {
      alert(err.response?.data.message || 'Eita! Ocorreu um erro!');
    }
  }

  useEffect(() => {
    console.log(`Images: ${images}`);
    console.log(`Preview Images: ${previewImages}`);
  }, [images, previewImages]);

  return (
    <div id="page-create-orphanage">
      <Sidebar />

      <main>
        <form onSubmit={handleSubmit} className="create-orphanage-form">
          <fieldset>
            <legend>Dados</legend>

            <Map
              center={[-9.414112,-36.6328008]}
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
      </main>
    </div>
  );
}

export default CreateOrphanage;
