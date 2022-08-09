import Taro from '@tarojs/taro';

export const goPage: (url: string, options?: Record<string, any>) => void = (
  url,
  options,
) => {
  Taro.navigateTo({ url, ...(options || {}) });
};

export const setStorage: (key: string, data: Record<string, any>) => void = (
  key,
  data,
) => {
  try {
    Taro.setStorageSync(key, JSON.stringify(data));
  } catch (error) {}
};

export const removeStorage: (key: string) => void = (key) => {
  try {
    Taro.removeStorageSync(key);
  } catch (error) {}
};

export const getStorage: (key: string) => Record<string, any> = (key) => {
  try {
    const v = Taro.getStorageSync(key) || {};
    return JSON.parse(v);
  } catch (error) {
    return {};
  }
};

export const clearStorage: () => void = () => {
  try {
    Taro.clearStorageSync();
  } catch (error) {}
};
