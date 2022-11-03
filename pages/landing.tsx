import React from "react"
import { base64UrlEncode } from "../common/base64/base64UrlEncode"
import Loading from "../common/layout/Loading"

const Landing = () => {
  React.useEffect(() => {
    const memory = JSON.parse(localStorage.getItem("memory")!)

    if (memory.template) {
      const template = base64UrlEncode(memory.template)
      window.location.href = `/embed?data=${template}`
    }
  }, [])

  return <Loading />
}

export default Landing
