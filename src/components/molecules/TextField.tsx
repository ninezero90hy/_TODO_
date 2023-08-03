import Input, { InputProps } from '../atoms/Input';
import classNames from 'classnames';

const DEFAULT_CLASSNAME = 'form-control';

interface TextFieldProps extends InputProps {}

const TextField = (textFieldProps: TextFieldProps) => {
  return (
    <Input
      {...textFieldProps}
      className={classNames(DEFAULT_CLASSNAME, textFieldProps?.className)}
    />
  );
};

export default TextField;
