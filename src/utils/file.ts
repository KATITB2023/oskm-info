import axios, { type AxiosProgressEvent } from 'axios';
import { env } from '~/env.cjs';

export enum FolderEnum {
  PROFILE = 'profile',
  ASSIGNMENT = 'assignment'
}

export enum AllowableFileTypeEnum {
  PDF = 'application/pdf',
  PNG = 'image/png',
  JPEG = 'image/jpeg'
}

export enum Lembaga {
  HMJ = 'HMJ',
  UKM = 'UKM',
  PENGMAS = 'PENGMAS',
  DLL = 'DLL'
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
      'API-KEY': env.NEXT_PUBLIC_BUCKET_API_KEY
    },
    onUploadProgress
  });
};

export const downloadFile = async (
  url: string,
  onDownloadProgress?: (progressEvent: AxiosProgressEvent) => void
) => {
  const axiosInstance = axios.create();

  const response = await axiosInstance.get<Blob>(url, {
    responseType: 'blob',
    headers: {
      'API-KEY': env.NEXT_PUBLIC_BUCKET_API_KEY
    },
    onDownloadProgress
  });

  return response.data;
};
