import { TextareaHTMLAttributes } from 'react';
import { EMPTY_VALUE } from '../../common/constants/code';

export interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = ({ value, ...textAreaProps }: TextAreaProps) => {
  return (
    <textarea
      {...textAreaProps}
      value={value ?? EMPTY_VALUE}
    />
  );
};

export default Textarea;
