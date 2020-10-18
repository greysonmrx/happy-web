import React, { FormEvent, useEffect, useState } from 'react';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { useHistory } from 'react-router-dom';

import Button from '../components/Button';
import RestrictedBackground from '../components/RestrictedBackground';

import api from '../services/api';

import '../styles/pages/forgot-password.css';

const ForgotPassword: React.FC = () => {
  const { goBack } = useHistory();

  const [email, setEmail] = useState('');
  const [buttonDisabled, setButtonDisabled] = useState(true);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    try {
      await api.post('/forgot-password', { email });

      alert('Vá até a sua caixa de e-mail e redefina sua senha!');
    } catch(err) {
      alert(err.response?.data.message || 'Eita! Ocorreu um erro.');
    }
  }

  useEffect(() => {
    console.log(email);
  }, [email])

  useEffect(() => {
    if (email) {
      setButtonDisabled(false);

      return;
    }

    setButtonDisabled(true);
  }, [email]);

  return (
    <div id="page-forgot-password">
      <RestrictedBackground />

      <main>
        <form onSubmit={handleSubmit}>
          <fieldset>
            <legend>Esqueci a senha</legend>
            <p>Sua redefinição de senha será enviada para o e-mail cadastrado.</p>
            <div className="input-block">
              <label htmlFor="">E-mail</label>
              <input
                type="text"
                value={email}
                onChange={event => setEmail(event.target.value)}
              />
            </div>
          </fieldset>

          <Button disabled={buttonDisabled} type="submit">Entrar</Button>
        </form>

        <button onClick={goBack}>
          <IoMdArrowRoundBack size={24} color="#15C3D6" />
        </button>
      </main>
    </div>
  );
}

export default ForgotPassword;
