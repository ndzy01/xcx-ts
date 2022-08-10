import { Page } from '@/components';
import Taro, { getCurrentInstance } from '@tarojs/taro';

const Search = () => {
  return (
    <Page>
      <iframe
        {...(Taro.getEnv() === 'WEB'
          ? {
              style: {
                padding: '0 16px',
                width: '100%',
                height: 'calc(100vh - 100px)',
              },
            }
          : {})}
        src={getCurrentInstance()?.router?.params?.url}
      />
    </Page>
  );
};

export default Search;
