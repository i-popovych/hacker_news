export const getMainUrlName = (url) => {
  return url ? url.split('/')[3] : "hn.com"
}