import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Winner = () => {
  
  const {name, balance, deposit} = useSelector(state => state.user.userData)

  return (
    <div className='container__congrats'>
      <h2 className="game game__rules game__congrats">Вітаємо {name}, ви змогли подвоїти ваш депозит з {deposit} до {balance}.</h2>
      <Link className="game__button coin__button" to="/login">Заново</Link>
    </div>
  );
};

export default Winner;
