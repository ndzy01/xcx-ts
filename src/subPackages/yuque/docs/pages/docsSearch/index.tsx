import { Page } from '@/components';
import { useReq } from '@/utils/https';
import { useSetState } from 'ahooks';
import { AtSearchBar } from 'taro-ui';
import Taro from '@tarojs/taro';
import { View } from '@tarojs/components';

const Search = () => {
  const [s, setS] = useSetState({ type: 'doc', q: '', list: [], msg: '' });
  const { run } = useReq();
  return (
    <Page>
      <AtSearchBar
        showActionButton
        value={s.q}
        onChange={(v) => {
          setS({ q: v });
        }}
        onActionClick={async () => {
          if (s.q) {
            setS({ msg: '' });
            Taro.showLoading({
              title: '加载中',
            });
            const data = await run({
              url: '/search',
              method: 'GET',
              data: { q: s.q, type: s.type, related: true },
            });
            Taro.hideLoading();
            if (data.data.data.length > 0) {
              setS({ list: data.data.data || [] });
            } else {
              setS({ msg: '没有找到奥' });
            }
          }
        }}
      />
      {s.list.map((_: any) => (
        <View
          className="doc-item"
          key={_.id}
          onClick={() => {
            Taro.setClipboardData({
              data: `https://www.yuque.com/u22409297/fqv2ol/${_.target.slug}`,
            });
          }}
        >
          {_.title}
        </View>
      ))}
      {s.list.length === 0 && <View>{s.msg}</View>}
    </Page>
  );
};

export default Search;
