import React, { useState } from "react"
import { PrimaryButton } from "../../../common/input/button/PrimaryButton"
import { ModalAction } from "../../../common/modal/layout/ModalAction"
import { ModalBody } from "../../../common/modal/layout/ModalBody"
import { ModalContainer } from "../../../common/modal/layout/ModalContainer"
import { ModalFooter } from "../../../common/modal/layout/ModalFooter"
import { ModalHeader } from "../../../common/modal/layout/ModalHeader"
import { ModalTitle } from "../../../common/modal/layout/ModalTitle"
import { ModalContext } from "../../../common/modal/ModalContext"
import { useRequiredContext } from "../../../common/state/useRequiredContext"
import { mainDomain } from "../../../common/utilities/constants"
import { remove } from "../../../icons/remove"
import type { EditorManagerLike } from "../EditorManager"
import styles from "./ConfigModal.module.css"

export type ConfigModalProps = {
  editorManager: EditorManagerLike
}

const setMsg = async (manager: EditorManagerLike) => {
  const memory = JSON.parse(localStorage.getItem("memory")!)
  const { url, type } = memory
  if (!url) return false
  const data = JSON.stringify(manager.messages[0].data)

  return fetch(url, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Authorization": localStorage.getItem("token") ?? "",
    },
    body: JSON.stringify(
      type === "join" ? { join_message: data } : { leave_message: data },
    ),
  })
}

export function ConfigModal(props: ConfigModalProps) {
  const { editorManager } = props
  const modal = useRequiredContext(ModalContext)
  const [btn, setBtn] = useState<string | null>(null)

  return (
    <ModalContainer>
      <ModalHeader>
        <ModalTitle>Config</ModalTitle>
        <ModalAction
          icon={remove}
          label="Close"
          onClick={() => modal.dismiss()}
        />
      </ModalHeader>
      <ModalBody>
        <div className={styles.container}>
          <div className={styles.row}>
            <div className={styles.child}>
              <PrimaryButton
                onClick={() => {
                  const memory = JSON.parse(localStorage.getItem("memory")!)
                  const { url } = memory
                  const guild = url.match(/\/guilds\/(\d+)/)?.[1]
                  window.location.href = `${mainDomain}/dashboard/${guild}`
                }}
              >
                Back to Dashboard
              </PrimaryButton>
            </div>
            <div className={styles.child}>
              <PrimaryButton
                onClick={async () => {
                  setBtn("loading")
                  const res = await setMsg(editorManager)
                  if (!res) setBtn(null)
                  else if (res.ok) setBtn("success")
                  else setBtn("error")
                }}
              >
                {btn === null ? (
                  `Set as ${
                    JSON.parse(localStorage.getItem("memory")!).type === "join"
                      ? "join"
                      : "leave"
                  } message`
                ) : btn === "loading" ? (
                  <span className={styles.loader} />
                ) : btn === "error" ? (
                  "Error"
                ) : (
                  "Done!"
                )}
              </PrimaryButton>
            </div>
          </div>
        </div>
      </ModalBody>
      <ModalFooter>
        <PrimaryButton
          onClick={() => {
            modal.dismiss()
          }}
        >
          Close
        </PrimaryButton>
      </ModalFooter>
    </ModalContainer>
  )
}
