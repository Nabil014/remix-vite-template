import { Outlet, useLoaderData } from "@remix-run/react";
import { LoaderFunction } from "@remix-run/server-runtime";
import { requireAuthCookie2 } from "~/utils/auth";

import LayoutMain from '../components/Layout/LayoutMain';

export const loader: LoaderFunction = async ({ request }) => {
    const userId = await requireAuthCookie2(request);

  
    return { userId };
  };
  
export default function Dashboard (){
    const {  userId } = useLoaderData<typeof loader>();

    return(
        <div>
                 <LayoutMain userId={userId}>
   
            <Outlet/>
            </LayoutMain>

        </div>
    )
}