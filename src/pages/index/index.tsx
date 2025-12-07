import { View, Text, Navigator } from "@tarojs/components";
import { useLoad } from "@tarojs/taro";
import "./index.scss";

export default function Index() {
  useLoad(() => {
    console.log("Page loaded.");
  });

  const menus = [
    { title: "视频覆盖示例", url: "/pages/demo-video/index" },
    { title: "地图与用户信息", url: "/pages/demo-map/index" },
  ];

  return (
    <View className="home">
      <Text className="home__title">示例导航</Text>
      <View className="home__list">
        {menus.map((m) => (
          <Navigator key={m.url} url={m.url} className="home__item">
            <Text className="home__item-title">{m.title}</Text>
          </Navigator>
        ))}
      </View>
    </View>
  );
}
