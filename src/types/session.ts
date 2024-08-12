export interface Session {
  user: {
    id: string;
    email: string;
    username?: string;
    name?: string;
    lastname?: string;
    birthdate?: string;
    image?: string;
  };
}

export interface AuthResult {
  type: string;
  message: string;
}

export interface User extends Record<string, any> {
  id: string;
  email: string;
  username: string;
  password: string;
  salt: string;
}
