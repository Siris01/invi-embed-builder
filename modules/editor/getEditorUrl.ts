import { base64UrlEncode } from "../../common/base64/base64UrlEncode"
import { domain } from "../../common/utilities/constants"
import type { EditorManagerLike } from "./EditorManager"

export const getEditorUrl = (manager: EditorManagerLike) => {
  const messages = manager.messages.map(message => ({
    data: message.data,
  }))

  const json = JSON.stringify({ messages })
  const base64 = base64UrlEncode(json)

  return String(new URL(`${domain}/?data=${base64}`))
}
