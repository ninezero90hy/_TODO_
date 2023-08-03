import React from 'react';

const Button = (buttonProps: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  return <button {...buttonProps} />;
};

export default Button;
