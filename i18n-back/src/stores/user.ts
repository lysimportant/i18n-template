import { defineStore } from 'pinia'
interface IUser {
  id: number
  token: string
  username: string
}
export const useUserStore = defineStore('user', function () {
  const user: IUser = {
    id: 0,
    token: '',
    username: ''
  }
  const users: IUser[] = []

  return {
    user,
    users
  }
})
