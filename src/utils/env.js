// 拆这个是为了避免循环引用
import { getEnv, ENV_TYPE } from '@tarojs/taro';

const platformType = getEnv();

export const platformIsWeb = platformType === ENV_TYPE.WEB;
export const platformIsWeApp = platformType === ENV_TYPE.WEAPP;
