import create from 'zustand';
import Todo from '../domains/todo';
import { persist } from 'zustand/middleware';
import produce from 'immer';

const TODO_STORE_NAME = 'DRAFT_TODO';
const DEFAULT_TODO: Todo | null = Todo.ofDraft();

export interface DraftTodoState {
  todo: Todo | null;
  updateTitle: (title: string) => void;
  updateContent: (content: string) => void;
  initialize: Function;
}

export const useDraftTodoStore = create(
  persist<DraftTodoState>(
    (set) => ({
      todo: DEFAULT_TODO,
      updateTitle: (title: string) => {
        set(
          produce((state: DraftTodoState) => {
            return {
              todo: {
                ...state.todo,
                title: title,
              },
            };
          }),
        );
      },
      updateContent: (content: string) => {
        set(
          produce((state: DraftTodoState) => {
            return {
              todo: {
                ...state.todo,
                content: content,
              },
            };
          }),
        );
      },
      initialize: () => set({ todo: DEFAULT_TODO }),
    }),
    {
      name: TODO_STORE_NAME,
    },
  ),
);
