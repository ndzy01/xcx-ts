import Taro from '@tarojs/taro';
import { AtGrid, AtMessage, AtCountdown } from 'taro-ui';
import { Page } from '@/components';
import { goPage } from '@/utils';
import { useSetState } from 'ahooks';
import dayjs from 'dayjs';
import './index.scss';

const Index = () => {
  const [s, setS] = useSetState({ showCountdown: false });
  const onclick: (item: any) => void = (item) => {
    switch (item.value) {
      case '当前时间':
        Taro.atMessage({
          message: dayjs().format('YYYY-MM-DD HH:mm:ss'),
          type: 'info',
        });
        break;
      case '计时器':
        setS({ showCountdown: true });
        break;
      case '语雀文档':
        goPage('/subPackages/yuque/docs/pages/docs/index');
        break;
      case '搜索文档':
        goPage('/subPackages/yuque/docs/pages/docsSearch/index');
        break;
        break;
      default:
        break;
    }
  };
  const onTimeUp = () => {
    Taro.showToast({
      title: '时间到',
      icon: 'success',
      duration: 2000,
    });
    setS({ showCountdown: false });
  };

  return (
    <Page>
      <AtMessage />
      <AtGrid
        onClick={(item) => onclick(item)}
        data={[
          {
            value: '当前时间',
          },
          {
            value: '计时器',
          },
          {
            value: '语雀文档',
          },
          {
            value: '搜索文档',
          },
        ]}
      />
      {s.showCountdown && (
        <AtCountdown
          format={{ hours: ':', minutes: ':', seconds: '' }}
          seconds={60}
          onTimeUp={() => onTimeUp()}
        />
      )}
    </Page>
  );
};

export default Index;
