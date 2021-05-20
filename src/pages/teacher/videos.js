import { useEffect, useState } from 'react'
import AppLayout from '@/components/Layouts/AppTeacherLayout'
import { useVideo } from '@/hooks/video'
import tw, { styled } from 'twin.macro'

const Videos = () => {
    const { fetchVideos } = useVideo()
    const [videos, setVideos] = useState([])

    useEffect(() => {
        const f = async () => {
            const videos = await fetchVideos()
            console.log(videos.data)
            setVideos(videos.data)
        }
        f()
    }, [])

    return (
        <AppLayout header={<HeaderHeadline>Videos</HeaderHeadline>}>
            <Content>
                <Card>
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
                            {videos.map(video => {
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
                </Card>
            </Content>
        </AppLayout>
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

const TABLE = styled.table`
    ${tw`table-fixed`};
`

const TH = styled.th`
    ${tw`w-1/4 text-left p-4`};
`

const TD = styled.td`
    ${tw`p-4`};
`

export default Videos
