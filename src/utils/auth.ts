import { Modal } from 'antd';
// import { WebAuth } from '../../.authli/index';
import { WebAuth } from '@li-idaas/authli';
import { getEnv } from './common';
import { IDaasInfo } from '../Constants';

/** 获取IDaas使用的环境 */
export const getIdaasEnv = () => (getEnv('prod') === 'prod' ? 'prod' : 'ontest');

// 初始化
const auth = new WebAuth({
  clientId: IDaasInfo[getIdaasEnv()].CLIENT_ID,
  // clientSecret: IDAAS_CLIENT_SECRET,
  useRefreshToken: true,
  env: getIdaasEnv(), // 除了prod使用prod的idaas，其余都使用ontest的idaas
});

/**
 * 单点登录。在其他系统使用同一个认证源（理想员工等）登录过都有效。
 * 如果未登录过，会跳到iDaas登录页
 * 如果登录过但是本地无id_token，自动获取id_token并存储
 * 如果登录过并且本地有id_token，do nothing
 */
const login = async () => {
  if (!(await auth.isAuthenticated())) {
    // 未登录，前去登录
    try {
      // 首先解析返回参数，解析失败再去登录
      await auth.handleRedirectCallback();
    } catch (e) {
      await auth.login({
        redirectUri: window.location.href,
      });
    }
  }
};

/**
 * 获取登录用户信息。
 * @param toLogin true-如果未登录，则跳转登录, false-如果未登录，返回null
 * @returns 用户信息
 */
const getUser = async (toLogin = false) => {
  if (await auth.isAuthenticated()) {
    try {
      // 登录态，返回用户信息
      return auth.getUser();
    } catch (e) {
      return null;
    }
  }
  if (!toLogin) return null;
  // 前去登录
  try {
    await auth.login({
      redirectUri: window.location.href,
    });
    return auth.getUser();
  } catch (e) {
    return null;
  }
};

/**
 * 登出
 * @param federated 是否联合登出，即登出后所有其他平台都登出
 */
const logout = async (federated = false) => {
  auth.logout({
    federated,
    returnTo: window.location.href,
  });
};

/**
 * 获取用于某一个业务服务的访问token。优先从本地获取，超过过期时间从服务端重新获取，
 * 如果未取得授权的话为空。
 * @param service 需要访问的服务ID
 * @returns access_token或者undefined
 */
const getAccessToken = async (service: string) => {
  try {
    // getToken方法有可能会抛出异常（比如refresh_token失效时），出异常时，当作无token处理
    const token = await auth.getToken({ audience: service });
    return token;
  } catch (e) {
    return undefined;
  }
};

/**
 * 获取用于某一个业务服务的访问token。如果本次没有获取到，则会延迟一段时间后重试
 * @param service 需要访问的服务ID
 * @param delay 延迟重试的时间
 * @param maxRetryCount 最大重试次数
 * @returns access_token或者undefined
 */
const getAccessTokenWithRetry = async (service: string, delay = 500, maxRetryCount = 6) => {
  return new Promise<string | undefined>((resolve) => {
    let count = 0;
    const tryGetToken = async () => {
      count += 1;
      const token = await getAccessToken(service);
      // console.log(`本次${token ? '获取到token' : '未获取到token'}`);
      if (token) resolve(token);
      // 防止无限等待
      else if (count > maxRetryCount) resolve(undefined);
      else setTimeout(tryGetToken, delay);
    };
    tryGetToken();
  });
};

/**
 * 获取已授权的scopes列表，必须在授权后调用，否则为空数组
 * @param service 需要访问的服务ID
 * @returns scopes-字符串数组
 */
export const getAuthScopes = async (service: string) => {
  const ak = await getAccessToken(service);
  if (ak) {
    const { scopes }: { scopes: string[] } = await auth.parseAccessToken(ak);
    return scopes;
  }
  return [];
};

/** 根据access_token解析出scopes列表 */
export const getAuthScopesByToken = async (ak: string) => {
  const { scopes }: { scopes: string[] } = await auth.parseAccessToken(ak);
  return scopes;
};

/**
 * 授权服务
 * 如果未授权，跳转授权页（静默授权时，不跳转，自动获取）
 * 如果已授权，do nothing
 * 授权成功后，本地存储access_token，并有过期时间
 * @param audience 需要访问的服务ID
 * @param scope 权限列表 空格分割
 */
const authorize = async (service: string, scope: string) => {
  try {
    const isAuth = await auth.isAuthenticated();
    const acToken = await getAccessToken(service);
    // 未登录或者无授权token，去获取
    if (!isAuth || !acToken) {
      try {
        // 首先解析返回参数，解析失败再去登录
        await auth.handleRedirectCallback();
        // window.location.reload();
      } catch (e) {
        await auth.authorize({
          audience: service,
          scope,
          redirectUri: window.location.href,
        });
      }
    }
  } catch (e) {
    console.error(e);
  }
};

/**
 * 401中断，提示用户重新登录
 * @param needLogout 是否调用登出
 */
const handle401 = (needLogout = true) => {
  Modal.error({
    title: '提示',
    content: '当前登录状态已过期，请重新登录!',
    closable: false,
    okText: '确定',
    afterClose: () => {
      if (needLogout) {
        auth.logout({
          returnTo: window.location.href,
        });
      } else {
        window.location.reload();
      }
    },
  });
};

/**
 * 是否为登录态
 * @returns 是否登录
 */
const isLogin = async () => {
  return auth.isAuthenticated();
};

/**
 * 监听到退出登录事件
 */
auth.on('logout', () => {
  handle401(false);
});

export default {
  login,
  logout,
  authorize,
  handle401,
  getAccessToken,
  getAccessTokenWithRetry,
  getAuthScopes,
  getAuthScopesByToken,
  getUser,
  isLogin,
  raw: auth,
};
