import React from 'react';
import TodoPage from './components/pages/TodoPage';
import useModals from './components/molecules/Modal/hooks/useModals';
import CreateTodoModal from './components/organisms/CreateTodoModal';
import { useDraftTodoStore } from './store/dfaftTodo';
import { useTodoStore } from './store/todo';

function App() {
  const { openModal } = useModals();
  const [todos] = useTodoStore((state) => [state.todos]);
  const [todo, initialize] = useDraftTodoStore((state) => [state.todo, state.initialize]);

  return (
    <>
      <TodoPage
        title={'To Do'}
        dataSource={todos}
        onSave={() =>
          openModal(CreateTodoModal, {
            title: todo?.title,
            content: todo?.content,
            onDone: () => initialize(),
          })
        }
      />
    </>
  );
}

export default App;
