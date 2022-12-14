import { Page } from '@/components';
import { useReq } from '@/utils/https';
import { View } from '@tarojs/components';
import { useSetState } from 'ahooks';
import { AtAccordion, AtList, AtListItem } from 'taro-ui';
import Taro, { useReady } from '@tarojs/taro';
import { goPage } from '@/utils';

interface DocRecord {
  id: string;
  slug: string;
  title: string;
  fTitle?: string;
  fSlug?: string;
}
const List = ({ list, uid }: { list: DocRecord[]; uid: string }) => {
  const [s, setS] = useSetState<{ open: boolean }>({ open: false });

  return list.length ? (
    <AtAccordion
      open={s.open}
      onClick={(v) => setS({ open: v })}
      title={list[0]?.fTitle}
    >
      <AtList hasBorder={false}>
        {list.map((l) => (
          <AtListItem
            key={l.id}
            title={l.title}
            onClick={() => {
              Taro.setClipboardData({
                data: `https://www.yuque.com/${uid}/${l.fSlug}/${l.slug}`,
              });
              goPage(
                `/subPackages/yuque/pages/docDetail/index?url=https://www.yuque.com/${uid}/${l.fSlug}/${l.slug}?view=doc_embed&from=asite&outline=1`,
              );
            }}
          />
        ))}
      </AtList>
    </AtAccordion>
  ) : (
    <View />
  );
};
const Docs = () => {
  const [s, setS] = useSetState<{ list: DocRecord[][]; uid: string }>({
    list: [],
    uid: '',
  });
  const { run } = useReq();

  useReady(async () => {
    Taro.showLoading({
      title: '加载中',
    });
    try {
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
        let res: DocRecord[][] = [];
        for (let index = 0; index < d2.data.data.length; index++) {
          const ele = d2.data.data[index];
          const data = await run({
            url: `/repos/${ele.id}/docs`,
            method: 'GET',
            data: {},
          });

          res.push(
            (data.data?.data || []).map((item: DocRecord) => ({
              ...item,
              fTitle: ele.name,
              fSlug: ele.slug,
            })),
          );
        }
        Taro.hideLoading();
        setS({ list: res, uid: d1.data.data.id });
      }
    } catch (error) {
      Taro.hideLoading();
    }
  });

  return (
    <Page>
      {s.list.map((item, index) => (
        <List key={index} list={item} uid={s.uid} />
      ))}
    </Page>
  );
};

export default Docs;
