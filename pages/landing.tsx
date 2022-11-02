import React from "react"
import { mainDomain } from "../common/utilities/constants"
import styles from "./landing.module.css"

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
  return (
    <div className={styles.container}>
      <span className={styles.loader} />
      <span className={styles.text}>Loading...</span>
    </div>
  )
}

export default Landing
