import React from "react"
import Loading from "../common/layout/Loading"
import { mainDomain } from "../common/utilities/constants"

const Landing = () => {
  React.useEffect(() => {
    window.addEventListener("message", msg => {
      if (msg.origin === mainDomain) {
        localStorage.setItem("token", msg.data.token)
        localStorage.setItem("servers", JSON.stringify(msg.data.servers))
        window.location.href = "/"
      }
    })
  }, [])

  return <Loading />
}

export default Landing
