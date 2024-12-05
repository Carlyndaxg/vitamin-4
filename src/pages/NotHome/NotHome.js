import React, { useState, useEffect } from 'react';

const NotHome = () => {
  const [counter, setCounter] = useState(0);
  const [message, setMessage] = useState('');

  const increment = () => setCounter(counter + 1);
  const decrement = () => setCounter(counter - 1);


  useEffect(() => {
    if (counter < 0) {
      setCounter(0);
    }

    if (counter > 5) {
      setMessage('You passed 5!');
    } else {
      setMessage('');
    }
  }, [counter]); 

  return (
    <div>
      <h1>Not Home Page</h1>
      <p>Counter: {counter}</p>
      {message && <p>{message}</p>}

      {/* Buttons to increment or decrement the counter */}
      <button onClick={increment}>Increase</button>
      <button onClick={decrement}>Decrease</button>
    </div>
  );
};

export default NotHome;
