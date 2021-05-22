import Head from 'next/head'
import GuestLayout from '@/components/Layouts/GuestLayout'

export default function Home() {
    return (
        <>
            <Head>
                <title>Laravel</title>
            </Head>
            <GuestLayout>
                <div className="py-12">
                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="p-6 bg-white border-b border-gray-200">
                                You're logged in!
                            </div>
                        </div>
                    </div>
                </div>
            </GuestLayout>
        </>
    )
}
