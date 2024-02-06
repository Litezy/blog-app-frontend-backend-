import axios from 'axios'

export const URL = 'http://localhost:5001/api'
export const imageurl = 'http://localhost:5001'


export const auth_urls = {
    login: 'user/login',
    signup: 'user/create-account',
    profile:'user/get-profile',
    logout: 'user/logout'
}

export const blog_urls = {
    all: 'blog/all',
    single: 'blog/single'
}

export const Apis = {
    auth: auth_urls,
    blog: blog_urls
}
export const blogAtt_urls = {
    likes: 'blog/likes',
    dislikes: 'blog/dislikes',
    comments: 'blog/comment'
}

export const BlogApis = {
    attribute: blogAtt_urls
}

export const ClientGetApi = async (endpoint) => {
    const response = await axios.get(`${URL}/${endpoint}`)
    return response.data
}

export const ClientPostApi = async (endpoint, data) => {
    const response = await axios.post(`${URL}/${endpoint}`, data)
    return response.data
}
