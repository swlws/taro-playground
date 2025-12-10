import { PropsWithChildren } from "react";
import { useLaunch } from "@tarojs/taro";
import { uploadFile } from "./paltform/index";
import { useLogin } from "./shared/hooks/useLogin";

import "./app.scss";

function App({ children }: PropsWithChildren<any>) {
  const { login } = useLogin();
  useLaunch(() => {
    console.log("App launched.");

    uploadFile();

    login();
  });

  // children 是将要会渲染的页面
  return children;
}

export default App;
