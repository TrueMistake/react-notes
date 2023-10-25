export interface UserInterface {
  login: string,
  password: string
}

export interface AuthInterface {
  signIn: (newUser: UserInterface, callback: Function) => void;
  signOut: (callback: Function) => void;
  user: UserInterface | null;
}