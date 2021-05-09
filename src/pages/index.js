import Link from 'next/link'
import Head from 'next/head'

export default function Home() {
    return (
        <>
            <Head>
                <title>Laravel</title>
            </Head>

            <div className="relative flex items-top justify-center min-h-screen bg-gray-100 dark:bg-gray-900 sm:items-center sm:pt-0">
                <div className="hidden fixed top-0 right-0 px-6 py-4 sm:block">
                    <Link href="/login">
                        <a className="text-sm text-gray-700 underline">Login</a>
                    </Link>

                    <Link href="/register">
                        <a className="ml-4 text-sm text-gray-700 underline">
                            Register
                        </a>
                    </Link>
                </div>
            </div>
        </>
    )
}
