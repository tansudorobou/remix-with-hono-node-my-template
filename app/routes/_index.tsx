import type { LoaderFunctionArgs } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import { hc } from "hono/client"
import { AppType} from "server"

const client = hc<AppType>(import.meta.env.VITE_HONO_URL)

export const loader = async (args: LoaderFunctionArgs) => {
  const extra = args.context.extra
  const url = args.context.url
  const auth = args.request.headers.get('Authorization') || ''

  const res = await client.api.$get({},{ headers:  { Authorization: auth }})
  if (!res.ok) {
    const errorData = await res.json()
    throw new Error(errorData.message)
  }
  
  const data= await res.json()
  return { extra, url, data }
}

export default function Index() {
  const { extra, url, data } = useLoaderData<typeof loader>()
  return (
    <div>
      <h1>Remix and Hono</h1>
      <h2>URL is {url}</h2>
      <h3>Extra is {extra}</h3>
      <h3>{data?.message}</h3>
      <h3>{data?.name}</h3>
    </div>
  )
}
