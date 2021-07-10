export interface SignInRequest extends Record<string, string> {
  email: string;
  password: string;
}

export interface SignUpRequest extends Record<string, string> {
  first_name: string;
  second_name: string;
  login: string;
  email: string; // Email /^\S+@\S+$/
  password: string;
  phone: string; // Phone /^((8|+7)[- ]?)?((?\d{3})?[- ]?)?[\d- ]{7,10}$/
}

export interface UserRequest extends Record<string, string> {
  first_name: string,
  second_name: string,
  display_name: string,
  login: string,
  email: string,
  phone: string
}

export interface ChangePasswordRequest extends Record<string, string> {
  oldPassword: string,
  newPassword: string
}

export interface UserResponse extends Record<string, string | number> {
  id: number,
  first_name: string,
  second_name: string,
  display_name: string,
  login: string,
  email: string,
  phone: string,
  avatar: string,
}

export type LastMessage = {
  user: UserResponse;
  time: string, // timestamp
  content: string,
} | string;

export interface ChatsResponse extends Record<string, any> {
  id: number,
  title: string,
  avatar: string,
  unread_count: number,
  last_message: LastMessage,
}

export interface ChatUserRequest extends Record<string, any>{
  users: number[],
  chatId: number,
}
