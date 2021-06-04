import { useEffect, useState } from 'react'
import Head from 'next/head'
import Player from '@vimeo/player'
import { useRouter } from 'next/router'
import { useVideo } from '@/hooks/video'
import GuestLayout from '@/components/Layouts/GuestLayout'
import tw, { styled } from 'twin.macro'

export default function Teacher({ video }) {
  const router = useRouter()

  useEffect(() => {
    const f = async () => {
      if (video?.title) {
        const player = new Player('sample')

        player.on('play', function () {
          console.log('played the video!')
        })
      }
    }
    f()
  }, [video])

  return (
    <>
      <Head>
        <title>Laravel</title>
      </Head>
      <GuestLayout header={<HeaderHeadline>Teacher</HeaderHeadline>}>
        <Content>
          <Card>
            {video?.title && (
              <>
                <h2 className="pb-3 text-lg font-bold">{video.title}</h2>
                <div className="inline-flex mt-1">
                  <div>
                    <img
                      class="inline object-cover w-16 h-16 mr-2 rounded-full"
                      src={video.teacher.image}
                      alt="Profile image"
                    />
                  </div>
                  <div className="mt-4 ml-1">{video.teacher.name}</div>
                </div>
                <div className="mt-8">
                  <iframe
                    id="sample"
                    src="https://player.vimeo.com/video/76979871"
                    width="640"
                    height="360"
                    frameborder="0"
                  ></iframe>
                </div>
              </>
            )}
          </Card>
        </Content>
      </GuestLayout>
    </>
  )
}

export const getStaticProps = async ({ params }) => {
  const { fetchVideo } = useVideo()
  const video = await fetchVideo(params.id)

  return {
    props: { video },
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
