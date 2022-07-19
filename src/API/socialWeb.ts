import axios from "axios";

const socialWebApi = axios.create({
    baseURL: 'http://localhost:3001'
})

export const signUp = async (values: { avatar: any; }) => {
    return await socialWebApi.post('/auth/sign-up',values)
}

export const signIn = async (values:Record<string,any>) => {
    return await socialWebApi.post('/auth/sign-in',values)
}

export const authMe = async () => {
    socialWebApi.defaults.headers.common['Authorization'] = ` Bearer ${localStorage.getItem('access_token')}`;
    if (localStorage.getItem('access_token')) {
        return await socialWebApi.get('/auth/me')
    } else {
        console.log('Пользователь не авторизован')
    }
}

export const addPost = async (values:Record<string,any>) => {
    return await socialWebApi.post('/posts',values)
}

export const getPosts = async (userId:string | number | undefined) => {
    return await socialWebApi.get(`/posts?s={"userId":${userId}}`)
}

export const deletePost = async (id:number) => {
    return await socialWebApi.delete(`/posts/${id}`)
}

export const getUser = async (id:string) => {
    return await socialWebApi.get(`/users/${id}`)
}

export const searchUser = async (activeId:number, queryParams?:string ) => {
    if (!queryParams)
    {queryParams=`?filter=id||$ne||${activeId}`} 
    else {
    queryParams= `?filter=id||$ne||${activeId}&filter=firstName||$starts||${queryParams}`
    }
    return await socialWebApi.get(`/users${queryParams}`)
}
export default socialWebApi