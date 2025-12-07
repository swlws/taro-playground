import { View, Image, Text, CustomWrapper } from "@tarojs/components";
import { memo } from "react";

function Row({ id, index, style, data }: any) {
  const it = data[index];
  return (
    <View id={id} style={style}>
      <CustomWrapper>
        {/* 这是“真实渲染节点”，把类放这里 */}
        <View className="vlist__item">
          <Image className="vlist__item-img" src={it.img} mode="aspectFill" lazyLoad />
          <View className="vlist__item-body">
            <Text className="vlist__item-title">{it.title}</Text>
            <Text className="vlist__item-time">{it.time}</Text>
          </View>
        </View>
      </CustomWrapper>
    </View>
  );
}

export default memo(Row);
