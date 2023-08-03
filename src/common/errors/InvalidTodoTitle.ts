class InvalidTodoTitle extends Error {
  constructor(message: string) {
    super(message);
  }
}

export default InvalidTodoTitle;
