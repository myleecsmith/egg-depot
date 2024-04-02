import React from 'react';

const Button = ({ onClick }) => {
  return (
    <button onClick={onClick}>Toggle Sidebar</button>
  );
};

export default Button;
