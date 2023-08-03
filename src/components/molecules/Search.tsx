import { FiSearch } from 'react-icons/fi';
import Input, { InputProps } from '../atoms/Input';
import styled from 'styled-components';
import Button from '../atoms/Button';
import { KeyboardEvent, useState } from 'react';
import { Key } from 'ts-key-enum';
import { ICON_DEFAULT_SIZE } from '../../common/constants/code';

const SEARCH_INPUT_TYPE = 'text';
const SEARCH_ICON_COLOR = 'black';

interface SearchProps extends Omit<InputProps, 'type' | 'value' | 'onChange' | 'onKeyUp'> {
  defaultValue?: string;
  onSearch?: (v?: string) => void;
}

const Search = ({ defaultValue, onSearch, ...searchProps }: SearchProps) => {
  const [value, setValue] = useState(defaultValue);

  const emitSearchEvent = () => {
    if (!onSearch) return;
    onSearch(value);
  };

  const keyboardEventIsEnter = (event: KeyboardEvent<HTMLInputElement>) => {
    return event.key === Key.Enter;
  };

  return (
    <>
      <StyledInput
        {...searchProps}
        type={SEARCH_INPUT_TYPE}
        value={value}
        onKeyUp={(event) => {
          if (!keyboardEventIsEnter(event)) return;
          emitSearchEvent();
        }}
        onChange={(v) => {
          setValue(v?.target?.value);
        }}
      />
      <StyledButton>
        <FiSearch
          size={ICON_DEFAULT_SIZE}
          color={SEARCH_ICON_COLOR}
          onClick={emitSearchEvent}
        />
      </StyledButton>
    </>
  );
};

export default Search;

const StyledInput = styled(Input)`
  height: 30px;
  padding: 5px 0px 5px 10px;
  border: 1px solid transparent;
  color: black;
  outline: none;
  background: #f4f6f7;
  font-size: 14.4px;
`;

const StyledButton = styled(Button)`
  color: rgba(0, 0, 0, 0.45);
  background-color: #f4f6f7;
  outline: none;
  position: relative;
  display: inline-block;
  font-weight: 400;
  white-space: nowrap;
  text-align: center;
  background-image: none;
  border: 1px solid transparent;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  user-select: none;
  touch-action: manipulation;
`;
