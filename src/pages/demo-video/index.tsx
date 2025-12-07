import { View, Video, CoverView, Button } from "@tarojs/components";
import Taro from "@tarojs/taro";
import "./index.scss";

export default function DemoVideo() {
  const play = () => {
    const video = Taro.createVideoContext("v");
    video.play();
  };

  return (
    <View className="page-demo-video">
      <Button onClick={play}>播放视频（普通 View 立刻消失）</Button>

      <Video
        id="v"
        className="video"
        src="https://www.w3schools.com/html/mov_bbb.mp4"
        controls
      />

      {/* 普通 View：播放后会被遮住 */}
      <View className="normal-overlay">
        普通 View
      </View>

      {/* CoverView：永远能覆盖 */}
      <CoverView className="cover-overlay">
        CoverView
      </CoverView>
    </View>
  )
}
