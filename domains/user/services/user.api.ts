import { authRepository } from "../repository/auth-repository";


export const createUser = async (email: string, password: string) => {
  return await authRepository.register(email, password);
};

export const loginUser = async (email : string, password: string) => {
  return await authRepository.login(email, password)
}

export const logoutUser = async () => {
  return await authRepository.logout()
}