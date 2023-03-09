import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateBalance, selectBalance } from '../redux/userSlice';
import { selectDeposit } from '../redux/userSlice';
import { Link } from 'react-router-dom';

const NumberGame = () => {
  const [number, setNumber] = useState('');
  const [result, setResult] = useState('');
  const balance = useSelector(selectBalance);
  const deposit = useSelector(selectDeposit);
  const dispatch = useDispatch();
  const [balanceHistory, setBalanceHistory] = useState([]);

  const cost = Math.round(0.05 * deposit);
  
  const handleClick = () => {
      if (number === '') {
        setResult('Введіть число!');
        return;
      }
      const num = parseInt(number);
      if (num > 10) {
        setResult('Число не може бути більше 10!');
        return;
      }

    const newBalance = balance - cost;
    dispatch(updateBalance(newBalance));

    const randomNumber = Math.floor(Math.random() * 10);

    if (+number === randomNumber) {
      const winAmount = +deposit * 10;
      const newBalance = balance + winAmount;
      dispatch(updateBalance(newBalance));
      setBalanceHistory([...balanceHistory, `${number}: +${winAmount}`]);
      setResult(`Ви виграли!`);
    } else {
      setBalanceHistory([...balanceHistory, `${number}: -${cost}`]);
      setResult(`Ви програли!`);
    }
    setNumber('');
  };

  return (
    <div className='container'>
      <div className='container__back'>
       <Link to='/games' className='left__button'>Назад</Link>
      </div>
      <div className='container__left'>
        <h2>Вгадай число</h2>
        <p className='game game__rules'>Кожен раз коли ви клікаєте по на кнопку “спробувати”, з вашого балансу списується 5% від вашого початкового депозиту, программа генерує випадкове значення від 1 до 10,  якщо ваш варінт співпав з тим який згенерувала программа то ви отримаєте вдесятеро більше ніж поставили, якщо ні то втрачаєте списані кошти з балансу.</p>
        <input className="game__input" form__input type="number" max={10} value={number} onChange={(e) => setNumber(e.target.value)} />
        <button className='game__button' onClick={handleClick}>Спробувати</button>
        {result && (
        <div className='btn__result-container'>
          <p className='game game__rules'>{result}</p>
        </div>
        )}
      </div>
      <div className='container__right game'>
        <h3>Минулі спроби</h3>
        <ul className='right__list'>
          {balanceHistory.map((change, index) => (
            <li className='right__item' key={index}>
            {change}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default NumberGame;

