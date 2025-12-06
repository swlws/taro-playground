import { View, Text, Map } from "@tarojs/components";
import { useLoad } from "@tarojs/taro";
import UserInfo from "./components/user-info";
import "./index.scss";

export default function Index() {
  useLoad(() => {
    console.log("Page loaded.");
  });

  return (
    <View className="index">
      <Text>Hello world!</Text>

      <Map
        longitude={116.4074} // 北京天安门经度
        latitude={39.9042} // 北京天安门纬度
        scale={12} // 地图缩放级别
        show-compass
        enable-zoom
        enable-scroll
        onError={(e) => console.log(e)}
        style={{ width: "100%", height: "400px" }}
      />

      <UserInfo />
    </View>
  );
}
