import TodoList, { TodoListProps } from '../templates/TodoList';

interface TodoProps extends TodoListProps {}

const TodoPage = (props: TodoProps) => {
  return <TodoList {...props} />;
};

export default TodoPage;
