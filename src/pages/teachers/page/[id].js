import Head from 'next/head'
import Link from 'next/link'
import { useTeacher } from '@/hooks/teacher'
import GuestLayout from '@/components/Layouts/GuestLayout'
import Pagination from '@/components/Pagination'
import tw, { styled } from 'twin.macro'

export default function Teachers({ teachers }) {
  return (
    <>
      <Head>
        <title>Laravel</title>
      </Head>
      <GuestLayout header={<HeaderHeadline>Teachers</HeaderHeadline>}>
        <Content>
          <Card>
            <h2 className="pb-3 text-lg">All Teachers</h2>
            {teachers?.data === undefined ? (
              <p>ロード中です。</p>
            ) : (
              <>
                <Grid>
                  {teachers.data.map((teacher) => {
                    return (
                      <Link href={`/teacher/${teacher.name}`}>
                        <a>
                          <div key={teacher.id}>
                            <div>
                              <img src={teacher.image} />
                            </div>
                            <p>{teacher.name}</p>
                          </div>
                        </a>
                      </Link>
                    )
                  })}
                </Grid>
                <Pagination
                  containerClass={'inline-flex mt-6 items-center'}
                  prevButtonClass={'pr-2 mr-1'}
                  numberButtonClass={'p-2 mr-3 bg-gray-200'}
                  paginationData={teachers}
                  changePage={({ page }) => router.push(`/teachers/page/${page}`)}
                />
              </>
            )}
          </Card>
        </Content>
      </GuestLayout>
    </>
  )
}

export const getStaticProps = async ({ params }) => {
  const { fetchTeachers } = useTeacher()
  const teachers = await fetchTeachers(params.id)

  return {
    props: { teachers },
    revalidate: 1
  }
}

export const getStaticPaths = async () => {
  const { fetchTeachers } = useTeacher()
  const teachers = await fetchTeachers()

  const range = (start, end) => [...Array(end - start + 1)].map((_, i) => start + i)

  const paths = range(1, teachers.meta.last_page).map((page) => `/teachers/page/${page}`)

  return {
    paths,
    fallback: false
  }
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
