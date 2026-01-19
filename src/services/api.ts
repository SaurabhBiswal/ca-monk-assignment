import axios from 'axios';
import type { Blog, CreateBlogInput } from '../types/blog.ts';

const API_BASE_URL = 'http://localhost:3001';

const api = axios.create({
    baseURL: API_BASE_URL,
});

export const blogService = {
    getAllBlogs: async (): Promise<Blog[]> => {
        const response = await api.get('/blogs');
        return response.data;
    },
    getBlogById: async (id: string): Promise<Blog> => {
        const response = await api.get(`/blogs/${id}`);
        return response.data;
    },
    createBlog: async (blog: CreateBlogInput): Promise<Blog> => {
        const response = await api.post('/blogs', blog);
        return response.data;
    },
};
