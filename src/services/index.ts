import { Item } from '@/types';
import axiosInstance from '@/utils/axios';

export const getItems = () =>
  axiosInstance.get<Item[], Item[]>('/posts', {
    params: {
      userId: 1,
    },
  });

export const postItem = (title: string, body: string) =>
  axiosInstance.post<Item, Item, Partial<Item>>('/posts', {
    title,
    body,
    userId: 1,
  });
