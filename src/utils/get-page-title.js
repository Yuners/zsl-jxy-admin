import defaultSettings from '@/settings'

const title = defaultSettings.title || '数字乡村管理系统'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
