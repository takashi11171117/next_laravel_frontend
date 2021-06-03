import Head from 'next/head'
import { useRouter } from 'next/router'
import { useTeacher } from '@/hooks/teacher'
import { useVideo } from '@/hooks/video'
import GuestLayout from '@/components/Layouts/GuestLayout'
import tw, { styled } from 'twin.macro'

export default function Teacher({ videos, teacher }) {
  const router = useRouter()

  return (
    <>
      <Head>
        <title>Laravel</title>
      </Head>
      <GuestLayout header={<HeaderHeadline>Teacher</HeaderHeadline>}>
        <Content>
          <Card>
            {teacher?.name && <h2 className="pb-3 text-lg">{teacher.name}</h2>}
            {videos?.data === undefined ? (
              <p>ロード中です。</p>
            ) : (
              <>
                <TABLE>
                  <thead>
                    <tr>
                      <TH>Movie</TH>
                      <TH />
                      <TH>Vimeo Id</TH>
                      <TH>Views</TH>
                    </tr>
                  </thead>
                  <tbody>
                    {videos.data.map((video) => {
                      return (
                        <tr key={video.id}>
                          <TD>
                            <img src={video.thumbnail_path} />
                          </TD>
                          <TD>{video.title}</TD>
                          <TD>{video.vimeo_video_id}</TD>
                          <TD>858</TD>
                        </tr>
                      )
                    })}
                  </tbody>
                </TABLE>
              </>
            )}
          </Card>
        </Content>
      </GuestLayout>
    </>
  )
}

export const getStaticProps = async ({ params }) => {
  const { fetchVideos } = useVideo()
  const { fetchTeacher } = useTeacher()
  const videos = await fetchVideos(params.name)
  const teacher = await fetchTeacher(params.name)

  console.log(videos)

  return {
    props: { videos, teacher },
    revalidate: 1
  }
}

export const getStaticPaths = async () => ({
  paths: [],
  fallback: true
})

const HeaderHeadline = styled.div`
  ${tw`font-semibold text-xl text-gray-800 leading-tight`};
`

const Content = styled.div`
  ${tw`max-w-7xl mx-auto sm:px-6 lg:px-8 py-12`};
`

const Card = styled.div`
  ${tw`bg-white overflow-hidden shadow-sm sm:rounded-lg p-6`};
`

const TABLE = styled.table`
  ${tw`table-fixed`};
`

const TH = styled.th`
  ${tw`w-1/4 text-left p-4`};
`

const TD = styled.td`
  ${tw`p-4`};
`
