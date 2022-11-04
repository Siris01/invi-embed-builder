import React from "react"
import { base64UrlEncode } from "../common/base64/base64UrlEncode"
import Loading from "../common/layout/Loading"

const Landing = () => {
  React.useEffect(() => {
    const memory = JSON.parse(localStorage.getItem("memory") ?? "{}")

    if (memory.template)
      window.location.href = `/embed?data=${base64UrlEncode(
        JSON.stringify({ message: memory.template }),
      )}`
    else window.location.href = "/embed"
  }, [])

  return <Loading />
}

export default Landing
