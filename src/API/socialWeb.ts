import axios from "axios";

const socialWebApi = axios.create({
    baseURL: 'http://localhost:3001'
})

export const signUp = async (values: { avatar: any; }) => {
    return await socialWebApi.post('/auth/sign-up', values)
}

export const signIn = async (values: Record<string, any>) => {
    return await socialWebApi.post('/auth/sign-in', values)
}

export const authMe = async () => {
    socialWebApi.defaults.headers.common['Authorization'] = ` Bearer ${localStorage.getItem('access_token')}`;
    if (localStorage.getItem('access_token')) {
        return await socialWebApi.get('/auth/me')
    } else {
        console.log('Пользователь не авторизован')
    }
}

export const addPost = async (values: Record<string, any>) => {
    return await socialWebApi.post('/posts', values)
}

export const getPosts = async (userId: string | number | undefined) => {
    return await socialWebApi.get(`/posts?s={"userId":${userId}}`)
}

export const deletePost = async (id: number) => {
    return await socialWebApi.delete(`/posts/${id}`)
}

export const deleteMessage = async (id: number) => {
    return await socialWebApi.delete(`/messages/${id}`)
}

export const getUser = async (id: string) => {
    return await socialWebApi.get(`/users/${id}`)
}

export const searchUsers = async (activeId: number, queryParams?: string) => {
    let q = `?filter=id||$ne||${activeId}`
    if (queryParams) {
        q = `?filter=id||$ne||${activeId}&filter=firstName||$starts||${queryParams}`
    }
    return await socialWebApi.get(`/users${q}`)
}

export const addConversation = async (values: Record<string, any>) => {
    return await socialWebApi.post('/conversations',values)
}

export const getConversations = async () => {
    return await socialWebApi.get('/conversations')
}

export const getMessages = async (conversationId:any) => {
    return await socialWebApi.get(`/messages?filter=conversationId||$eq||${conversationId}`)
}

export const postMessage = async (values:{text:string,conversationId:string}) => {
    return await socialWebApi.post('/messages',values)
}

export const editUser = async (values: Record<string,any>) => {
return await socialWebApi.patch('/auth/update',values)
}

export default socialWebApi