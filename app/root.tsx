// app/root.tsx o app/entry.client.tsx (cualquier archivo que sea el punto de entrada principal)
import type { LinksFunction, LoaderFunction } from '@remix-run/node';
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from '@remix-run/react';
import 'flowbite';
import stylesheet from '~/tailwind.css?url';
import { requireAuthCookie2 } from './utils/auth';
import LayoutMain from './components/Layout/LayoutMain';
import { useRouteProgressBar } from './utils/useRouteProgressBar';
import nprogressCss from "./nprogress.css";
import "./nprogress.css";

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: stylesheet },
];

export const loader: LoaderFunction = async ({ request }) => {
  const userId = await requireAuthCookie2(request);
  const userAgent = request.headers.get("User-Agent");
  const isMobile = userAgent?.match(
    /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i
  );

  return { userId, isMobile };
};

export function Layout({ children }: { children: React.ReactNode }) {
  const { isMobile, userId } = useLoaderData<typeof loader>();
  useRouteProgressBar(!isMobile);

  return (
    <html lang='en'>
      <head>
        <meta charSet='utf-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <Meta />
        <Links />
      </head>
      <body className='bg-gradient-radial relative min-h-auto font-sans font-custom text-custom h-screen'>
        <LayoutMain userId={userId}>
          {children}
        </LayoutMain>
        <ScrollRestoration />
        <Scripts />
        <script src='https://cdn.jsdelivr.net/npm/preline@2.0.3/dist/preline.min.js'></script>
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
