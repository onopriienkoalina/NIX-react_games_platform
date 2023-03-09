import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectBalance, selectHistory } from '../redux/userSlice';
import { addBalanceHistory } from '../redux/gameSlice';

const Home = () => {
  const dispatch = useDispatch();
  const balanceHistory = useSelector(selectHistory);

  useEffect(() => {
    const totalChange =
      getBalanceChange('CoinGame') +
      getBalanceChange('DoorGame') +
      getBalanceChange('NumberGame');
    dispatch({ type: addBalanceHistory.type, payload: totalChange });
  }, [balanceHistory]);

  const getBalanceChange = (game) => {
    const gameHistory = balanceHistory.filter((item) => item.game === game);
    if (gameHistory.length === 0) {
      return 0;
    }
    const totalChange = gameHistory.reduce((acc, curr) => acc + curr.change, 0);
    return totalChange;
  };

  const coinGameBalance = getBalanceChange('CoinGame');
  const doorGameBalance = getBalanceChange('DoorGame');
  const numberGameBalance = getBalanceChange('NumberGame');

  return (
    <>
      <div className='container'>
        <div className='container__left'>
          <h2>Доступні ігри</h2>
          <div className="container__games">
            <div className="game door-game">
              <Link className="game__button" to="/door-game">Вгадай двері</Link>
            </div>
            <div className="game number-game">
             <Link className="game__button" to="/number-game">Вгадай число</Link>
            </div>
            <div className="game coin-game">
              <Link className="game__button" to="/coin-game">Монетка</Link>
            </div>
          </div>
          <p className='game game__rules'>Мета гри подвоїти початковий депозит, граючи в ігри</p>
        </div>
        <div className='container__right game'>
          <h3>Результати:</h3>
          <ul className='right__list'>
            <li className='right__item'>Монетка: {coinGameBalance}</li>
            <li className='right__item'>Вгадай двері: {doorGameBalance}</li>
            <li className='right__item'>Вгадай число: {numberGameBalance}</li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Home;
