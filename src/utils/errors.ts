export class ErrorWithStatusCode extends Error {
  message: string = "Something went wrong!";
  statusCode: number = 404;
  name: string = "Our Error";

  constructor() {
    super();
  }
}

export class UserNotFound extends ErrorWithStatusCode {
  constructor() {
    super();
    this.message = "User not found";
    this.name = "Authentication Error";
    this.statusCode = 403;
  }
}

export class IncorrectPassword extends ErrorWithStatusCode {
  constructor() {
    super();
    this.message = "Password is incorrect"
    this.name = "Authentication Erro"
    this.statusCode = 401
  }
}
