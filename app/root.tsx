// Importaciones de módulos y componentes
import type { LinksFunction, LoaderFunction } from '@remix-run/node'
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from '@remix-run/react'
import 'flowbite'
import stylesheet from '~/tailwind.css?url'
import { requireAuthCookie2 } from './utils/auth'
import LayoutMain from './components/Layout/LayoutMain'

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: stylesheet },
]
export const loader: LoaderFunction = async ({ request, params }) => {
  const userId = await requireAuthCookie2(request)

  return userId
}
export function Layout({ children }: { children: React.ReactNode }) {
  const userId = useLoaderData<typeof loader>()
  console.log('userId ',userId)
  return (
    <html lang='en'>
      <head>
        <meta charSet='utf-8' />
        <meta
          name='viewport'
          content='width=device-width, initial-scale=1'
        />
        <Meta />

        <Links />
      </head>
      <body className='bg-gradient-to-r from-[#1a1a1a] via-black to-[#00f0ff] '>
        <LayoutMain userId={userId}>

        <Outlet />
        </LayoutMain>
        <ScrollRestoration />
        <Scripts />

        <script src='https://cdn.jsdelivr.net/npm/preline@2.0.3/dist/preline.min.js'></script>
      </body>
    </html>
  )
}

export default function App() {
  return <Outlet />
}
