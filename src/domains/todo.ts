import { v4 as uuidv4 } from 'uuid';
import { encrypt } from '../common/utils/crypto';
import { isEmpty, size } from 'lodash';
import { EMPTY_VALUE } from '../common/constants/code';
import InvalidTodoContent from '../common/errors/InvalidTodoContent';
import InvalidTodoTitle from '../common/errors/InvalidTodoTitle';

export const TODO_TITLE_MAX_LENGTH = 30;
export const TODO_CONTENT_MAX_LENGTH = 100;

export enum TodoProgressStatus {
  DRAFT = 'DRAFT',
  PROGRESS = 'PROGRESS',
  COMPLETE = 'COMPLETE',
}

class Todo {
  id: string | null;
  title: string;
  content: string;
  status: TodoProgressStatus;
  createDate: Date | null;

  private constructor(
    id: string | null,
    title: string,
    content: string,
    status: TodoProgressStatus,
    createDate: Date | null,
  ) {
    this.id = id;
    this.title = title;
    this.content = content;
    this.status = status;
    this.createDate = createDate;
  }

  static isValidTitle(title: string) {
    if (isEmpty(title)) {
      return false;
    }

    return size(title) <= TODO_TITLE_MAX_LENGTH;
  }

  static checkValidForTitle(title: string) {
    if (!Todo.isValidTitle(title)) {
      throw new InvalidTodoTitle('Invalid title value');
    }
  }

  static isValidContent(content: string) {
    if (isEmpty(content)) {
      return false;
    }

    return size(content) <= TODO_CONTENT_MAX_LENGTH;
  }

  static checkValidForContent(content: string) {
    if (!Todo.isValidContent(content)) {
      throw new InvalidTodoContent('Invalid content value');
    }
  }

  static isComplete(status: TodoProgressStatus | undefined) {
    return status === TodoProgressStatus.COMPLETE;
  }

  static of(title: string, content: string) {
    Todo.checkValidForTitle(title);
    Todo.checkValidForContent(content);
    return new Todo(uuidv4(), encrypt(title), encrypt(content), TodoProgressStatus.PROGRESS, new Date());
  }

  static ofDraft() {
    return new Todo(null, EMPTY_VALUE, EMPTY_VALUE, TodoProgressStatus.DRAFT, null);
  }
}

export default Todo;
