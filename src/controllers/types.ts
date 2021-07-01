export interface SignInRequest {
  email: string;
  password: string;
}

export interface SignUpRequest{
  first_name: string;
  second_name: string;
  login: string;
  email: string; // Email /^\S+@\S+$/
  password: string;
  phone: string; // Phone /^((8|+7)[- ]?)?((?\d{3})?[- ]?)?[\d- ]{7,10}$/
}

export interface UserRequest {
  first_name: string,
  second_name: string,
  display_name: string,
  login: string,
  email: string,
  phone: string
}

export interface ChangePasswordRequest {
  oldPassword: string,
  newPassword: string
}

export interface UserResponse {
  id: number,
  first_name: string,
  second_name: string,
  display_name: string,
  login: string,
  email: string,
  phone: string,
  avatar: string,
}

export interface ChatsResponse {
  id: number,
  title: string,
  avatar: string,
  unread_count: number,
  last_message: {
    user: UserResponse;
    time: string, // timestamp
    content: string,
  }
}
