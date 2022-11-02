import React, { useEffect, useState } from "react"
import { PrimaryButton } from "../../../common/input/button/PrimaryButton"
import { ModalAction } from "../../../common/modal/layout/ModalAction"
import { ModalBody } from "../../../common/modal/layout/ModalBody"
import { ModalContainer } from "../../../common/modal/layout/ModalContainer"
import { ModalFooter } from "../../../common/modal/layout/ModalFooter"
import { ModalHeader } from "../../../common/modal/layout/ModalHeader"
import { ModalTitle } from "../../../common/modal/layout/ModalTitle"
import { ModalContext } from "../../../common/modal/ModalContext"
import { useRequiredContext } from "../../../common/state/useRequiredContext"
import { baseAPI } from "../../../common/utilities/constants"
import { remove } from "../../../icons/remove"
import { stringifyMessage } from "../../message/helpers/stringifyMessage"
import type { EditorManagerLike } from "../EditorManager"
import styles from "./ConfigModal.module.css"

export type ConfigModalProps = {
  editorManager: EditorManagerLike
}

const setMsg = async (
  manager: EditorManagerLike,
  type: "join" | "leave",
  guild: string | null,
) => {
  if (!guild) return false
  if (guild.length < 15) return false
  const data = stringifyMessage(manager.messages[0].data)

  return fetch(`${baseAPI}/${guild}/logging`, {
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
  const [servers, setServers] = useState<{ id: string; name: string }[]>([])
  const [server, setServer] = useState<string | null>(null)
  const [joinBtn, setJoinBtn] = useState<string | null>(null)
  const [leaveBtn, setLeaveBtn] = useState<string | null>(null)

  useEffect(() => {
    const servers = JSON.parse(localStorage.getItem("servers") ?? "[]")
    setServers(servers)
  }, [])

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
            <form>
              <label className={styles.child} htmlFor="server-list">
                Choose a server:
              </label>
              <select
                onChange={event => {
                  console.log(event.target.value)
                  setServer(event.target.value)
                }}
                className={`${styles.child} ${styles.dropdown}`}
                name="server-list"
                id="server-list"
              >
                {[
                  <option key={0} value={0} style={{ display: "none" }} />,
                  ...servers.map(s => (
                    <option
                      className={styles.dropdownElements}
                      key={s.id}
                      value={s.id}
                    >
                      {s.name}
                    </option>
                  )),
                ]}
              </select>
            </form>
          </div>
          <div className={styles.row}>
            <div className={styles.child}>
              <PrimaryButton
                onClick={async () => {
                  setJoinBtn("loading")
                  const res = await setMsg(editorManager, "join", server)
                  if (!res) setJoinBtn(null)
                  else if (res.ok) setJoinBtn("success")
                  else setJoinBtn("error")
                }}
              >
                {joinBtn === null ? (
                  "Set as join msg"
                ) : joinBtn === "loading" ? (
                  <span className={styles.loader} />
                ) : joinBtn === "error" ? (
                  "Error"
                ) : (
                  "Done!"
                )}
              </PrimaryButton>
            </div>
            <div className={styles.child}>
              <PrimaryButton
                onClick={async () => {
                  setLeaveBtn("loading")
                  const res = await setMsg(editorManager, "leave", server)
                  if (!res) setLeaveBtn(null)
                  else if (res.ok) setLeaveBtn("success")
                  else setLeaveBtn("error")
                }}
              >
                {leaveBtn === null ? (
                  "Set as leave msg"
                ) : leaveBtn === "loading" ? (
                  <span className={styles.loader} />
                ) : leaveBtn === "error" ? (
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
