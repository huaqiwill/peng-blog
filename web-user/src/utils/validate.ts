/* 是否为https协议、mailto协议、tel协议*/
export function isExternal(path: string): boolean {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/* 是否为指定格式的图片 */
export function isExternalIcon(path: string): boolean {
  return /^(\/)+([a-zA-Z0-9\s_\\.\-():/])+(.svg|.png|.jpg)$/g.test(path) || /^(https?:|mailto:|tel:)/.test(path)
}
