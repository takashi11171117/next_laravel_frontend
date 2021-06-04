import axios from '@/lib/axios'

export const useVideo = () => {
  const csrf = () => axios.get('/sanctum/csrf-cookie')

  const fetchVideos = async (teacherName) => {
    await csrf()

    const videos = await axios.get(`/api/teacher/${teacherName}/videos`).catch((error) => {
      if (error.response.status != 422) throw error
    })

    return videos.data
  }

  const fetchVideo = async (id) => {
    await csrf()

    const video = await axios.get(`/api/video/${id}`).catch((error) => {
      if (error.response.status != 422) throw error
    })

    return video.data.data
  }

  return {
    fetchVideos,
    fetchVideo
  }
}
