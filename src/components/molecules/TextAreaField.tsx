import classNames from 'classnames';
import Textarea, { TextAreaProps } from '../atoms/Textarea';

const DEFAULT_CLASSNAME = 'form-control';

interface TextAreaFieldProps extends TextAreaProps {}

const TextAreaField = (textAreaFieldProps: TextAreaFieldProps) => {
  return (
    <Textarea
      {...textAreaFieldProps}
      className={classNames(DEFAULT_CLASSNAME, textAreaFieldProps?.className)}
    />
  );
};

export default TextAreaField;
