import { InputHTMLAttributes } from 'react';
import { EMPTY_VALUE } from '../../common/constants/code';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

const Input = ({ value, ...inputProps }: InputProps) => {
  return (
    <input
      {...inputProps}
      value={value ?? EMPTY_VALUE}
    />
  );
};

export default Input;
