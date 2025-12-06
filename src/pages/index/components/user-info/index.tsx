import { View, Text, OpenData, Button, Image } from "@tarojs/components";
import { useState } from "react";
import Taro, { useDidShow } from "@tarojs/taro";
import "./index.scss";

export default function UserAvatarPage() {
  const [hasUserInfo, setHasUserInfo] = useState(false);

  // 页面显示时检查授权状态
  useDidShow(() => {
    Taro.getSetting().then((res) => {
      if (res.authSetting["scope.userInfo"]) {
        setHasUserInfo(true);
      } else {
        setHasUserInfo(false);
      }
    });
  });

  // 用户授权回调
  const handleGetUserInfo = (e) => {
    if (e.detail.userInfo) {
      setHasUserInfo(true);
    }
  };

  return (
    <View className="user-avatar-page">
      <Text className="title">用户信息示例</Text>

      {hasUserInfo ? (
        // 用户已授权
        <View className="user-info">
          <OpenData type="userAvatarUrl" defaultText="" className="avatar" />
          <OpenData
            type="userNickName"
            defaultText="匿名用户"
            className="nickname"
          />
        </View>
      ) : (
        // 未授权显示默认头像和按钮
        <View className="user-info">
          <Text className="nickname">请授权获取昵称</Text>
          <Button openType="getUserInfo" onGetUserInfo={handleGetUserInfo}>
            点击授权
          </Button>
        </View>
      )}
    </View>
  );
}
