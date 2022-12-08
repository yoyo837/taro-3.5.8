import { useRouter } from '@tarojs/taro';

// 重要功能, 抽取一下避免可能会整个项目到处修改
export default () => {
  // useRoute 必须 app ready 之后才能拿到信息
  const route = useRouter();
  //  route.params 实际是 query
  const query = route.params || {};
  // query 传参数保持编码的风格, 以符合 h5 的浏览器 url 规范, 但小程序的 url 传参不需要编码
  // 又由于没有类似vue-router的parser负责转码, 所以干脆自行负责统一编码和解码, mergeUrlQuery 是编码, 这里是解码
  const useQuery = {};
  Object.keys(query).forEach(key => {
    useQuery[key] = decodeURIComponent(query[key]);
  });
  return {
    query: useQuery,
  };
};
