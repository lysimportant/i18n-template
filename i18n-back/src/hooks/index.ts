import { DayjsFormatDate } from "@/utils"
import { computed } from "vue"

export const useDayjsFormateDate = () => {
  return computed(() => {
    return (v: number | string) => DayjsFormatDate(v)
  })
}