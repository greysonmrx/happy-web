import React, { FormEvent, useEffect, useState } from 'react';

import { Link, useHistory } from 'react-router-dom';
import { IoMdArrowRoundBack } from 'react-icons/io';

import RestrictedBackground from '../components/RestrictedBackground';
import Checkbox from '../components/Checkbox';
import Button from '../components/Button';

import { useAuth } from '../hooks/auth';

import '../styles/pages/login.css';

const Login: React.FC = () => {
  const { goBack } = useHistory();
  const { signIn } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(true);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    try {
      await signIn({ email, password, rememberMe });
    } catch(err) {
      alert(err.response?.data.message || 'Eita! Ocorreu um erro!');
    }
  }

  useEffect(() => {
    if (email && password) {
      setButtonDisabled(false);

      return;
    }

    setButtonDisabled(true);
  }, [email, password]);

  return (
    <div id="page-login">
      <RestrictedBackground />

      <main>
        <form onSubmit={handleSubmit}>
          <fieldset>
            <legend>Fazer login</legend>
            <div className="input-block">
              <label htmlFor="">E-mail</label>
              <input
                type="text"
                value={email}
                onChange={event => setEmail(event.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="">Senha</label>
              <input
                type="password"
                value={password}
                onChange={event => setPassword(event.target.value)}
              />
            </div>
          </fieldset>

          <div className="bottom-form">
            <Checkbox
              value={rememberMe}
              onChange={setRememberMe}
              label="Lembrar-me"
            />
            <Link to="/forgot_password">Esqueci minha senha</Link>
          </div>

          <Button disabled={buttonDisabled} type="submit">Entrar</Button>
        </form>

        <button onClick={goBack}>
          <IoMdArrowRoundBack size={24} color="#15C3D6" />
        </button>
      </main>
    </div>
  );
}

export default Login;
