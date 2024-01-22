import { oneNet } from "@/utils"

export const GenerateLDSService = (data: any) => {
  return oneNet.post({ data, url: "/lds" })
}
export const FindLDSService = (data: any) => {
  let query = ""
  for (const key in data) {
    if (Object.prototype.hasOwnProperty.call(data, key)) {
      if (query === "" && data[key] != "") {
        query += `?${key}=${data[key]}`
      } else if (query != "" && data[key] != "") {
        query += `&${key}=${data[key]}`
      }
    }
  }
  return oneNet.get({ url: "/lds" + query })
}
export const DeleteLDSService = (data: any) => {
  return oneNet.delete({data, url: "/lds"})
}

export const PatchLDSService = (data: any) => {
  return oneNet.patch({data, url: "/lds" })
}
