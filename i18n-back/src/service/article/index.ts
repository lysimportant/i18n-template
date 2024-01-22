import { oneNet } from "@/utils"

export const GenerateArticleService = (data: any) => {
  return oneNet.post({data, url: "/article"})
}
export const FindArticleService = (data: any) => {
  return oneNet.get({data, url: "/article?language="+data.language+"&title="+data.title+"&id="+data.id})
}

export const PatchArticleService = (data: any) => {
  return oneNet.patch({data, url: "/article"})
}

export const DeleteArticleService = (data: any) => {
  return oneNet.delete({data, url: "/article"})
}