import axios from '@/lib/axios'

export const useVideo = () => {
    const csrf = () => axios.get('/sanctum/csrf-cookie')

    const fetchVideos = async () => {
        await csrf()

        const videos = await axios.get('/api/teacher/videos').catch(error => {
            if (error.response.status != 422) throw error
        })

        return videos.data
    }

    return {
        fetchVideos,
    }
}
