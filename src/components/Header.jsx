import React from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, Outlet, useNavigate } from 'react-router-dom';

const Header = () => {
  const {name, balance, deposit} = useSelector(state => state.user.userData)
  const navigate = useNavigate();
  useEffect(()=>{
    //console.log("ddd");
    if (name === '' || deposit === 0)  return navigate("/login");
    if (balance >= deposit * 2) return navigate("/winner");
    if (balance <= 0) return navigate("/try-again");
  }, [balance] );

  return (
    <>
      <header className='header'>
      <div className="header__logo logo">Games platform</div>
      <nav>
        <ul className='header__list'>
          <li className='header__item'>Ім’я користувача: {name}</li>
          <li className='header__item'>Депозит: {deposit} </li>
          <li className='header__item'>Баланс: {balance}</li>
        </ul>
        <Link className='game__button' to="/login">Зіграти знову</Link>
      </nav>
      </header>
      <Outlet/>
      </>
  );
}

export default Header;
