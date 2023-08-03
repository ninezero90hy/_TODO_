import Modal from '../molecules/Modal';
import React, { useContext, useEffect, useState } from 'react';
import ModalsDispatchContext from '../molecules/Modal/contexts/ModalsDispatchContext';
import { useTodoStore } from '../../store/todo';
import TextField from '../molecules/TextField';
import TextAreaField from '../molecules/TextAreaField';
import { useDraftTodoStore } from '../../store/dfaftTodo';
import Todo, { TODO_CONTENT_MAX_LENGTH, TODO_TITLE_MAX_LENGTH } from '../../domains/todo';
import InvalidTodoTitle from '../../common/errors/InvalidTodoTitle';
import InvalidTodoContent from '../../common/errors/InvalidTodoContent';
import useMessages from '../molecules/Message/hooks/useMessags';

const MODAL_TITLE = '등록';

export interface CreateTodoModalProps {
  title: string;
  content: string;
  onDone?: () => void;
}

const CreateTodoModal = (createTodoModalProps?: CreateTodoModalProps) => {
  const { close } = useContext(ModalsDispatchContext);
  const { showInfoMessage, showErrorMessage } = useMessages();

  const [add] = useTodoStore((state) => [state.add]);
  const [updateTitle, updateContent] = useDraftTodoStore((state) => [state.updateTitle, state.updateContent]);

  const [title, setTitle] = useState(createTodoModalProps?.title ?? '');
  const [content, setContent] = useState(createTodoModalProps?.content ?? '');

  const selfClose = () => close(CreateTodoModal);

  useEffect(() => {
    updateTitle(title);
  }, [title]);

  useEffect(() => {
    updateContent(content);
  }, [content]);

  return (
    <Modal
      modalTitle={MODAL_TITLE}
      onClose={selfClose}
      onDone={() => {
        try {
          Todo.checkValidForTitle(title);
          Todo.checkValidForContent(content);
          add(title, content);
          if (createTodoModalProps?.onDone) createTodoModalProps.onDone();
          selfClose();
        } catch (e) {
          if (e instanceof InvalidTodoTitle) {
            showInfoMessage('제목을 입력해주세요');
          } else if (e instanceof InvalidTodoContent) {
            showInfoMessage('내용을 입력해주세요');
          } else {
            showErrorMessage('알 수 없는 오류가 발생했습니다');
          }
        }
      }}>
      <div className='mb-4'>
        <label
          className='form-label'
          htmlFor='form5Example1'>
          제목
        </label>
        <TextField
          maxLength={TODO_TITLE_MAX_LENGTH}
          value={title}
          onChange={(event) => setTitle(event?.target?.value)}
        />
      </div>
      <div className='mb-4'>
        <label
          className='form-label'
          htmlFor='form5Example2'>
          내용
        </label>
        <TextAreaField
          rows={5}
          maxLength={TODO_CONTENT_MAX_LENGTH}
          value={content}
          onChange={(event) => setContent(event?.target?.value)}
        />
      </div>
    </Modal>
  );
};

export default CreateTodoModal;
