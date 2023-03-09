import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createUser } from "../redux/userSlice";

const Form = () => {
  const [name, setName] = useState("");
  const [deposit, setDeposit] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const addUser = () => {
    console.log(deposit)
    dispatch(
      createUser({
        name,
        deposit,
        balance: deposit,
      })
    );
  }
  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleDepositChange = (e) => {
    setDeposit(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/games');
  };

  return (
    <div className='container'>
    <form className='form' onSubmit={handleSubmit}>
      <label>
      Ваше Ім’я
        <input className="form__input" type="text" value={name} onChange={handleNameChange} />
      </label>
      <label>
      Початковий депозит
        <input className="form__input" type="number" value={deposit} onChange={handleDepositChange} />
      </label>
      <button className='form__btn' type="submit" onClick={addUser} disabled={name === "" || deposit === ""}>Почати</button>
    </form>
    </div>
  );
};

export default Form;
