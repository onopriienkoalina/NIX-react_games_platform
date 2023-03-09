import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectBalance, updateBalance } from '../redux/userSlice';
import { selectDeposit } from '../redux/userSlice';
import { Link } from 'react-router-dom';
import { addBalanceHistory } from '../redux/gameSlice';

const CoinGame = () => {
  const [result, setResult] = useState('');
  const balance = useSelector(selectBalance);
  const deposit = useSelector(selectDeposit);
  const dispatch = useDispatch();
  const [balanceHistory, setBalanceHistory] = useState([]);
  
  const handleCoinFlip = (choice) => {
    const randomNumber = Math.random();
    const win = (choice === 'heads' && randomNumber < 0.5) || (choice === 'tails' && randomNumber >= 0.5);
    const newBalance = win ? +balance + deposit * 2 : balance - deposit * 0.05;
    dispatch(updateBalance(newBalance));
    setResult(win ? 'Ви вгадали!' : 'Ви не вгадали!');
    updateBalanceHistory(newBalance - balance, choice, win);

  };

  const updateBalanceHistory = (balanceChange, choice, win) => {
    const coinResult = win ? (choice === 'heads' ? 'Орел' : 'Решка') : (choice === 'heads' ? 'Решка' : 'Орел');
    const newBalanceHistory = [...balanceHistory, {user: 'user', balanceChange: `${coinResult}: ${win ? '+' : '-'}${Math.abs(balanceChange)}` }];
    setBalanceHistory(newBalanceHistory);
  };
  dispatch(addBalanceHistory({ game: 'CoinGame', change: 10 }));
  return (
    <div className='container'>
      <div className='container__back'>
       <Link to='/games' className='left__button'>Назад</Link>
      </div>
      <div className='container__left'>
        <h2>Монетка</h2>
        <p className='game game__rules'>Кожен раз коли ви нажимаєте на орел чи решка, з вашого балансу списується 5% від вашого початкового депозиту, программа генерує випадкове значення,  якщо ваш варінт співпав з тим який згенерувала программа то ви подвоюєте ставку якщо ні то втрачаєте списані кошти з балансу.</p>
        <div className='btn__container'>
          <button className="game__button coin__button" onClick={() => handleCoinFlip('heads')}>Орел</button>
          <button className="game__button coin__button" onClick={() => handleCoinFlip('tails')}>Решка</button>
        </div>
        {result && (
        <div className='btn__result-container'>
          <p className='game game__rules'>{result}</p>
        </div>
        )}
      </div>
      <div className='container__right game'>
        <h3>Минулі спроби</h3>
        <ul className='right__list'>
        {balanceHistory.map((history, index) => (
          <li className='right__item' key={index}>
          {history.balanceChange}
          </li>
        ))}
        </ul>
      </div>
    </div>
  );
};

export default CoinGame;
