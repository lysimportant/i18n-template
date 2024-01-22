import dayjs from 'dayjs'
export * from './network'
export function DayjsFormatDate(value: number | string, format = "YYYY-MM-DD HH:mm") {
  return dayjs(value).format(format).toString()
}
export const languageOptions = [
  {
    label: '中文',
    value: 'zh'
  },
  {
    label: '英文',
    value: 'en'
  },
  {
    label: '俄文',
    value: 'ru'
  }
]