import { Page } from '@/components';
import { useReq } from '@/utils/https';
import { View } from '@tarojs/components';
import { useSetState } from 'ahooks';
import Taro, { useReady } from '@tarojs/taro';
import './index.scss';

const Docs = () => {
  const [s, setS] = useSetState({ list: [] });
  const { run } = useReq();

  useReady(async () => {
    Taro.showLoading({
      title: '加载中',
    });
    const d1 = await run({
      url: '/user',
      method: 'GET',
      data: {},
    });
    const d2 = await run({
      url: `/users/${d1.data.data.id}/repos`,
      method: 'GET',
      data: {},
    });
    if (d2.data.data.length > 0) {
      let res: any[] = [];
      for (let index = 0; index < d2.data.data.length; index++) {
        const ele = d2.data.data[index];
        const data = await run({
          url: `/repos/${ele.id}/docs`,
          method: 'GET',
          data: {},
        });
        res.push(data.data.data);
      }
      console.log('res', res);
      Taro.hideLoading();
      setS({ list: res as any });
    }
  });

  return (
    <Page>
      {s.list.map((item: any) =>
        item.map((item1: any) => (
          <>
            <View
              className="doc-item"
              key={item1.id}
              onClick={() => {
                Taro.setClipboardData({
                  data: `https://www.yuque.com/u22409297/fqv2ol/${item1.slug}`,
                });
              }}
            >
              {item1.title}
            </View>
          </>
        )),
      )}
    </Page>
  );
};

export default Docs;
