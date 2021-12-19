export const processResponse = (v: any): boolean => {
  if (v.code !== 0) {
    return false
  }
  return true
}
