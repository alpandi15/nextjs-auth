import imageCompression from 'browser-image-compression'
import { request } from 'services/utils/request'

// User
const apiUploadImage = async (bucket: 'profiles'|'articles'|'assets', data: any) => {
  return request({
    url: `/utils/upload-image/${bucket}`,
    auth: true,
    data,
    method: 'post'
  })
}

export const uploadImage = async (bucket: 'profiles'|'articles'|'assets' = 'assets', image: any) => {
  try {
    const options: any = {
      maxSizeMB: 0.1,
      maxWidthOrHeight: 1920,
      useWebWorker: true
    }

    const imageCompress = await imageCompression(image, options)
    console.log(`compressedFile size ${imageCompress?.size / 1024 / 1024} MB`); // smaller than maxSizeMB
    const myFile = new File([imageCompress], imageCompress?.name, {
      type: imageCompress?.type,
    })

    const formData = new FormData()
    formData.append('file', myFile)
    const response = await apiUploadImage(bucket, formData)
    if (response?.success) {
      return { url: response?.data?.url, raw: response?.data?.public_id }
    }
    throw response
  } catch (error) {
    throw error
  }
}
