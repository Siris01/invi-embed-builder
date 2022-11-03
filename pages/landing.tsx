import React from "react"
import { base64UrlEncode } from "../common/base64/base64UrlEncode"
import Loading from "../common/layout/Loading"

const Landing = () => {
  React.useEffect(() => {
    window.addEventListener("message", msg => {
      if (msg.origin === process.env.NEXT_PUBLIC_MAIN_DOMAIN!) {
        localStorage.setItem("token", msg.data.token)
        localStorage.setItem("servers", JSON.stringify(msg.data.servers))

        if (!msg.data.template) {
          window.location.href = "/"
          return
        }

        const template = base64UrlEncode(JSON.stringify([msg.data.template]))
        window.location.href = `/?data=${template}`
      }
    })
  }, [])

  return <Loading />
}

export default Landing
