import create from 'zustand';
import Todo, { TodoProgressStatus } from '../domains/todo';
import { persist } from 'zustand/middleware';

const TODO_STORE_NAME = 'TODO';
const DEFAULT_TODOS: Array<Todo> = [];

export interface TodoState {
  todos: Array<Todo>;
  add: (title: string, content: string) => void;
  updateProgressStatusToProgress: (id: string) => void;
  updateProgressStatusToComplete: (id: string) => void;
  deleteById: (id: string) => void;
  initialize: Function;
}

export const useTodoStore = create(
  persist<TodoState>(
    (set) => ({
      todos: DEFAULT_TODOS,
      add: (title: string, content: string) => {
        return set((state: TodoState) => {
          return { todos: state.todos.concat(Todo.of(title, content)) };
        });
      },
      updateProgressStatusToProgress: (id: string) => {
        return set((state: TodoState) => {
          return {
            todos: state.todos.map((todo) => {
              if (todo.id === id) {
                todo.status = TodoProgressStatus.PROGRESS;
                return todo;
              }
              return todo;
            }),
          };
        });
      },
      updateProgressStatusToComplete: (id: string) => {
        return set((state: TodoState) => {
          return {
            todos: state.todos.map((todo) => {
              if (todo.id === id) {
                todo.status = TodoProgressStatus.COMPLETE;
                return todo;
              }
              return todo;
            }),
          };
        });
      },
      deleteById: (id: string) => {
        return set((state: TodoState) => {
          return {
            todos: state.todos.filter((todo) => todo.id !== id),
          };
        });
      },
      initialize: () => set({ todos: DEFAULT_TODOS }),
    }),
    {
      name: TODO_STORE_NAME,
    },
  ),
);
