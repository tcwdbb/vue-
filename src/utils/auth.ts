const TokenKey = "token";

/**
 * 获取token
 * @returns
 */
export function getToken() {
  return sessionStorage.getItem(TokenKey);
}
