import React from "react"
import styles from "./Loading.module.css"

const Loading = () => {
  return (
    <div className={styles.container}>
      <span className={styles.loader} />
      <span className={styles.text}>Loading...</span>
    </div>
  )
}

export default Loading
