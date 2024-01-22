import { oneNet } from '@/utils'
export interface ILogin {
  username: string
  password: string
}
export interface IResponseData {
  code: number
  msg: string
  data: any
}
export const UserLoginService = (data: ILogin) => {
  return oneNet.post<ILogin, IResponseData>({ data, url: '/user/login' })
}
export const GetUserAndListservice = (data: {username: string }) => {
  return oneNet.get<{username?: string}, IResponseData>({url: "/user?username="+data.username})
}
export const DeleteUserService = (data: any) => {
  return oneNet.delete({data, url: "/user"})
}
export const PostUserService = (data: any) => {
  return oneNet.post({data, url: "/user"})
}

export const PatchUserService = (data: any) => {
  return oneNet.patch({data, url: "/user"})
}