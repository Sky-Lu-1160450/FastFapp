export interface ILoginInfo {
    username: string
    password: string
  }
  
  export interface IUserInfo {
    id: number | string
    avatar: string
    nickname: string
    address?: string; // Add address field
  }
  
  export interface IAuth {
    userInfo: IUserInfo
    token: stirng
  }
  