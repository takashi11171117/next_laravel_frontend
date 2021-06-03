import axios from '@/lib/axios'

export const useTeacher = () => {
  const csrf = () => axios.get('/sanctum/csrf-cookie')

  const fetchTeachers = async (id = 1) => {
    await csrf()

    const teachers = await axios.get('/api/teachers', { params: { page: id } }).catch((error) => {
      if (error.response.status != 422) throw error
    })

    return teachers.data
  }

  const fetchTeacher = async (name) => {
    await csrf()

    const teacher = await axios.get(`/api/teacher/${name}`).catch((error) => {
      if (error.response.status != 422) throw error
    })

    return teacher.data.data
  }

  return {
    fetchTeachers,
    fetchTeacher
  }
}
