import Taro from "@tarojs/taro";
import { UseLoginResult } from "./types";

export function useLogin(): UseLoginResult {
  const login = async () => {
    console.log("【weapp】login");
    const { code } = await Taro.login();
    return { type: "weapp", code };
  };
  return { login };
}
