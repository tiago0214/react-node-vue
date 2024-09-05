export class EmailAlreadyExistsError extends Error {
  constructor() {
    super('Email has already been in use')
  }
}
