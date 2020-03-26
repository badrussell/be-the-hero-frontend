import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';

import logo from '../../assets/logo.svg'
import heroesImg from '../../assets/heroes.png'

function Login() {
  const [id, setId] = useState('');

  const history = useHistory();

  async function handlerLogin(e) {
    e.preventDefault();

    try {
      const response = await api.post('session', { id });

      localStorage.setItem('ongId', id);
      localStorage.setItem('ongName', response.data.name);

      history.push('profile');
    } catch (err) {
      alert('ong  nao existe');
    }
  }


  return (
    <div className="login-container">
      <section className="form">
        <img src={logo} alt="Be the Hero" />

        <form onSubmit={handlerLogin}>
          <h1>Faça seu login</h1>

          <input
            placeholder="Sua ID"
            value={id}
            onChange={e => setId(e.target.value)}
          />
          <button className="button" type="submit">Entrar</button>

          <Link to="/register" className="back-link">
            <FiLogIn size={16} color="#E02041" />
            Não tenho cadastro
          </Link>
        </form>
      </section>

      <img src={heroesImg} alt="Heroes" />
    </div>
  );
}

export default Login;
