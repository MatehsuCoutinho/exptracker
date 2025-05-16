import { API_PATHS } from "./apiPaths";
import axiosInstance from "./axios.instance";

const uploadImage = async (imageFile) => {
    const formData = new FormData()

    formData.append('image', imageFile)

    try {
        const response = await axiosInstance.post(API_PATHS.IMAGE.UPLOAD_IMAGE, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        return response.data

    } catch (error) {
        console.log('Erro enviando a imagem', error)
        throw error
    }
}

export default uploadImage