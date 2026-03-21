import { User } from "./user.types";

export interface AuthResponse {
  user: User;
  token: string;
}
