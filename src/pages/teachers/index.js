import Head from 'next/head'
import { useEffect, useState } from 'react'
import { useTeacher } from '@/hooks/teacher'
import GuestLayout from '@/components/Layouts/GuestLayout'
import tw, { styled } from 'twin.macro'

export default function Home() {
  const { fetchTeachers } = useTeacher()
  const [teachers, setTeachers] = useState([])

  useEffect(() => {
    const f = async () => {
      const videos = await fetchTeachers()
      console.log(videos.data)
      setTeachers(videos.data)
    }
    f()
  }, [])

  return (
    <>
      <Head>
        <title>Laravel</title>
      </Head>
      <GuestLayout header={<HeaderHeadline>Teachers</HeaderHeadline>}>
        <Content>
          <Card>
            <h2 className="pb-3 text-lg">All Teachers</h2>
            <Grid>
              {teachers.map((teacher) => {
                return (
                  <div key={teacher.id}>
                    <div>
                      <img src={teacher.image} />
                    </div>
                    <p>{teacher.name}</p>
                  </div>
                )
              })}
            </Grid>
          </Card>
        </Content>
      </GuestLayout>
    </>
  )
}

const HeaderHeadline = styled.div`
  ${tw`font-semibold text-xl text-gray-800 leading-tight`};
`

const Content = styled.div`
  ${tw`max-w-7xl mx-auto sm:px-6 lg:px-8 py-12`};
`

const Card = styled.div`
  ${tw`bg-white overflow-hidden shadow-sm sm:rounded-lg p-6`};
`

const Grid = styled.div`
  ${tw`grid grid-cols-2 sm:grid-cols-4 gap-4`};
`
