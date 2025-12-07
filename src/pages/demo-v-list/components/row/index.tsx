
import { View, Image, Text } from "@tarojs/components";
import { memo } from "react";

type Item = {
  id: string;
  title: string;
  time: string;
  img: string;
};

function Row({ id, index, style, data }: any) {
  const it: Item = data[index];
  return (
    <View id={id} className="vlist__item" style={style}>
      <Image className="vlist__item-img" src={it.img} mode="aspectFill" lazyLoad />
      <View className="vlist__item-body">
        <Text className="vlist__item-title">{it.title}</Text>
        <Text className="vlist__item-time">{it.time}</Text>
      </View>
    </View>
  );
}

export default memo(Row);  
