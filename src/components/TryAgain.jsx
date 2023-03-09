import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const TryAgain = () => {

  const {name, balance, deposit} = useSelector(state => state.user.userData)
  
  return (
    <div className='container__congrats'>
      <h2 className='game game__rules game__congrats'>{name}, ви не змогли подвоїти ваш депозит з {deposit} грн, можливо наступного разу пощастить.</h2>
      <Link className="game__button coin__button" to="/login">Заново</Link>
    </div>
  );
};

export default TryAgain;
