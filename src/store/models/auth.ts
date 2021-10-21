export interface User {
  phone: string,
  _id: string,
  name: string,
  role: number
}

export interface Token {
  token: string,
  user: User
}