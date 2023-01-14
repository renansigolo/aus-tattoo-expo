import { useRouter } from "next/router"

export default function IndexFallback() {
  const router = useRouter()
  console.log("🚀 ~ Home ~ router", router)
  return (
    <div className="text-white">
      <h1>Fallback</h1>
      {router.asPath === "/about" && <h1 className="text-white">About</h1>}
    </div>
  )
}
