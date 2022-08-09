import { goPage, clearStorage } from '@/utils';
import { View } from '@tarojs/components';
import classnames from 'classnames';
import { AtNavBar } from 'taro-ui';
import './index.scss';

interface Props {
  classNames?: string[];
  [key: string]: any;
}

const Page = (props: Props) => {
  return (
    <View className={classnames([...(props.classNames || []), 'page'])}>
      <AtNavBar
        onClickRgIconSt={() => {
          clearStorage();
          goPage('/pages/index/index');
        }}
        color="#000"
        title="ndzy"
        rightFirstIconType="home"
      />
      {props.children}
    </View>
  );
};

export default Page;
