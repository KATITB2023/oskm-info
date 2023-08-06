import axios, { type AxiosProgressEvent } from 'axios';
import { env } from '~/env.cjs';

export enum Lembaga {
  HMJ = 'HMJ',
  UKM = 'UKM',
  BSO = 'BSO',
  PUSAT = 'PUSAT'
}

export const uploadFile = async (
  url: string,
  file: File,
  onUploadProgress?: (progressEvent: AxiosProgressEvent) => void
) => {
  const axiosInstance = axios.create();
  const data = new FormData();
  data.append('file', file);

  await axiosInstance.put<null>(url, data, {
    headers: {
      'api-key': env.NEXT_PUBLIC_BUCKET_API_KEY
    },
    onUploadProgress
  });
};

export const deleteFile = async (url: string) => {
  const axiosInstance = axios.create();

  await axiosInstance.delete<null>(url, {
    headers: {
      'api-key': env.NEXT_PUBLIC_BUCKET_API_KEY
    }
  });
};
