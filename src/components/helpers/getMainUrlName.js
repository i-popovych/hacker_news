export const getMainUrlName = (url) => {
  return url ? url.split('/')[2] : "hn.com"
}