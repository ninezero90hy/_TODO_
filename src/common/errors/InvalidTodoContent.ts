class InvalidTodoContent extends Error {
  constructor(message: string) {
    super(message);
  }
}

export default InvalidTodoContent;
