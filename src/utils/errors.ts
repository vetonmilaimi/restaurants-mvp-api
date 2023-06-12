export class ErrorWithStatusCode extends Error {
  message: string = "Something went wrong!";
  statusCode: number = 404;
  name: string = "global-error";

  constructor() {
    super();
  }
}

export class UserNotFound extends ErrorWithStatusCode {
  constructor() {
    super();
    this.name = "Authentication Error";
    this.message = "user-not-found-error";
    this.statusCode = 403;
  }
}

export class EmailExists extends ErrorWithStatusCode {
  constructor() {
    super();
    this.name = "user-email-exists-error";
    this.message = "This Email is already in use.";
    this.statusCode = 400;
  }
}

export class IncorrectPassword extends ErrorWithStatusCode {
  constructor() {
    super();
    this.name = "password-incorrect-error";
    this.message = "Password is incorrect";
    this.statusCode = 401;
  }
}

export class InvalidToken extends ErrorWithStatusCode {
  constructor() {
    super();
    this.name = "invalid-token-error";
    this.message = "This token is invalid";
    this.statusCode = 498;
  }
}

export class TokenNotExists extends ErrorWithStatusCode {
  constructor() {
    super();
    this.name = "no-token-error";
    this.message = "This token not exists";
    this.statusCode = 498;
  }
}

export class ExpiredAccessToken extends ErrorWithStatusCode {
  constructor() {
    super();
    this.name = "access-token-expired";
    this.message = "Access Token has Expired";
    this.statusCode = 401;
  }
}

export class InvalidRefreshToken extends ErrorWithStatusCode {
  constructor() {
    super();
    this.name = "invalid-refresh-token";
    this.message = "Refresh Token is not valid";
    this.statusCode = 401;
  }
}

export class ExpiredRefreshToken extends ErrorWithStatusCode {
  constructor() {
    super();
    this.name = "expired-refresh-token";
    this.message = "Refresh token has Expired";
    this.statusCode = 401;
  }
}

export class RestaurantUniqueIdExists extends ErrorWithStatusCode {
  constructor() {
    super();
    this.name = "restaurant-unique-id-exists";
    this.message = "Restaurant Unique ID exists";
    this.statusCode = 400;
  }
}

export class InvalidTimeString extends ErrorWithStatusCode {
  constructor() {
    super();
    this.name = "invalid-time-string";
    this.message = "Invalid time string";
    this.statusCode = 400;
  }
}

RestaurantUniqueIdExists;
