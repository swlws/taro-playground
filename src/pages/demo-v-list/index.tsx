import { View, Text, Input, Button } from "@tarojs/components";
import { VirtualList } from "@tarojs/components-advanced";
import Taro, { useLoad } from "@tarojs/taro";
import { useEffect, useMemo, useRef, useState } from "react";
import Row from "./components/row";
import "./index.scss";

type Item = {
  id: string;
  title: string;
  time: string;
  img: string;
};

const ITEM_HEIGHT = 55;
const PAGE_SIZE = 100;
const MAX_PAGES = 100;
const OVERSCAN = 8;

function genMock(page: number, pageSize: number): Item[] {
  return Array.from({ length: pageSize }, (_, i) => {
    const idNum = page * pageSize + i + 1;
    const id = String(idNum);
    const title = `标题 ${id}`;
    const time = new Date(Date.now() - idNum * 100000).toLocaleString();
    const img = `https://picsum.photos/seed/${id}/80/80`;
    return { id, title, time, img };
  });
}

export default function DemoVList() {
  const [items, setItems] = useState<Item[]>([]);
  const [query, setQuery] = useState("");
  const [hasMore, setHasMore] = useState(true);
  const [listHeight, setListHeight] = useState(600);
  const pageRef = useRef(0);
  const loadingRef = useRef(false);
  const listRef = useRef<any>(null);

  useLoad(() => {
    loadMore();
  });

  useEffect(() => {
    Taro.nextTick(() => {
      Taro.createSelectorQuery()
        .select(".vlist__search")
        .boundingClientRect()
        .exec((res) => {
          const sh = (res && res[0] && res[0].height) || 60;
          const wh = Taro.getSystemInfoSync().windowHeight;
          setListHeight(Math.max(wh - sh, 300));
        });
    });
  }, []);

  const loadMore = () => {
    if (!hasMore) return;
    setItems((prev) => [...prev, ...genMock(pageRef.current, PAGE_SIZE)]);
    pageRef.current += 1;
    if (pageRef.current >= MAX_PAGES) {
      setHasMore(false);
    }
  };

  const onScroll = ({ scrollDirection, scrollOffset }) => {
    if (
      !loadingRef.current &&
      !query &&
      scrollDirection === "forward" &&
      scrollOffset >
      (items.length - Math.floor(listHeight / ITEM_HEIGHT)) * ITEM_HEIGHT +
      100
    ) {
      loadingRef.current = true;
      loadMore();
      loadingRef.current = false;
    }
  };

  const displayItems = useMemo(() => {
    if (!query) return items;
    return items.filter((it) => it.title.includes(query));
  }, [items, query]);

  return (
    <View className="vlist">
      <View className="vlist__search">
        <Input
          className="vlist__search-input"
          value={query}
          placeholder="输入关键字"
          onInput={(e) => setQuery(e.detail.value)}
        />
        <Button
          className="vlist__search-btn"
          onClick={() => {
            if (
              listRef.current &&
              typeof listRef.current.scrollTo === "function"
            ) {
              listRef.current.scrollTo(0);
            }
          }}
        >
          检索
        </Button>
      </View>

      <View className="vlist__list-wrapper">
        {displayItems.length === 0 ? (
          <View className="vlist__empty">
            <Text>暂无数据</Text>
          </View>
        ) : (
          <VirtualList
            ref={listRef}
            className="vlist__scroll"
            height={listHeight}
            width="100%"
            itemSize={ITEM_HEIGHT}
            itemCount={displayItems.length}
            itemData={displayItems}
            overscanCount={OVERSCAN}
            onScroll={onScroll}
            item={Row}
          />
        )}
        {hasMore && !query && displayItems.length > 0 && (
          <View className="vlist__loading">
            <Text>加载中…</Text>
          </View>
        )}
      </View>
    </View>
  );
}
