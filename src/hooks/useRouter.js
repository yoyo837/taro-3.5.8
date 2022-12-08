import { navigateBack } from '@tarojs/taro';
import { navigateTo, redirectTo, mergeUrlQuery } from '@/utils/utils';

// 重要功能, 抽取一下避免可能会整个项目到处修改
export default () => {
  return {
    go() {
      throw new Error('暂不支持');
    },
    back(opt) {
      navigateBack(opt);
    },
    push(opt) {
      if (opt == null) {
        return;
      }
      if (typeof opt === 'string') {
        navigateTo({
          url: opt,
        });
        return;
      }
      const { path, query } = opt;
      navigateTo({
        url: mergeUrlQuery(path, query),
      });
    },
    replace(opt) {
      if (opt == null) {
        return;
      }
      if (typeof opt === 'string') {
        redirectTo({
          url: opt,
        });
        return;
      }
      const { path, query } = opt;
      redirectTo({
        url: mergeUrlQuery(path, query),
      });
    },
  };
};
