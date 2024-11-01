export type LoginValues = {
  username: string
  password: string
}

export type RegisterResponse = {
  userId: string
  username: string
}

export type RegisterValues = {
  username: string
  password: string
  confirmPwd: string
}

export type LoggedInUser = {
  user: {
    userId: string;
    username: string;
  }
  token: string
}