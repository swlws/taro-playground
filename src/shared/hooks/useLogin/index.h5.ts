import { UseLoginResult } from "./types";

export function useLogin(): UseLoginResult {
  const login = async () => {
    console.log("【h5】login");
    const token = localStorage.getItem("token");
    return { type: "h5", token: token || null };
  };
  return { login };
}
