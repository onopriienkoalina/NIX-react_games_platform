import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateBalance, selectBalance } from '../redux/userSlice';
import { selectDeposit } from '../redux/userSlice';
import { Link } from 'react-router-dom';

const DoorGame = () => {
  const dispatch = useDispatch();
  const balance = useSelector(selectBalance);
  const deposit = useSelector(selectDeposit);
  const [selectedDoor, setSelectedDoor] = useState(null);
  const [result, setResult] = useState('');
  const [balanceHistory, setBalanceHistory] = useState([]);


  const handleDoorClick = (door) => {
    setSelectedDoor(door);
    const generatedDoor = generateRandomNumber();
    const newBalance = selectedDoor === generatedDoor ? balance + deposit * 3 : balance - deposit * 0.05;
    setResult(newBalance > balance ? 'Ви виграли!' : 'Ви програли!');
    dispatch(updateBalance(newBalance));
    setBalanceHistory([...balanceHistory, `${door}: ${newBalance - balance}`]);
  };
  
  const generateRandomNumber = () => {
    return Math.floor(Math.random() * 3) + 1;
  };
  
  return (
    <div className='container'>
      <div className='container__back'>
       <Link to='/games' className='left__button'>Назад</Link>
      </div>
      <div className='container__left'>
        <h2>Вгадай двері</h2>
        <p className='game game__rules'>Кожен раз коли ви клікаєте по одній з дверей, з вашого балансу списується 5% від вашого початкового депозиту, программа генерує випадкове значення від 1 до 3,  якщо ваш варінт співпав з тим який згенерувала программа то ви потроїте ставку якщо ні то втрачаєте списані кошти з балансу.</p>
        <div>
          <button className="game__door" onClick={() => handleDoorClick(1)}>1</button>
          <button className="game__door" onClick={() => handleDoorClick(2)}>2</button>
          <button className="game__door" onClick={() => handleDoorClick(3)}>3</button>
        </div>
        {result && (
        <div className='btn__result-container'>
          <p className='game game__rules'>{result}</p>
        </div>
        )}
      </div>
      <div className='container__right game'>
        <h3> Минулі спроби</h3>
        <ul className='right__list'>
        {balanceHistory.map((balance, index) => (
          <li className='right__item' key={index}> 
          {balance}
          </li>
        ))}
        </ul>
      </div>
    </div>
  );
};

export default DoorGame;
