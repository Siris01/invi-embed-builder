/* eslint-disable @typescript-eslint/no-unnecessary-condition */
import { useObserver } from "mobx-react-lite"
import { destroy, getSnapshot, SnapshotOut } from "mobx-state-tree"
import { useRouter } from "next/router"
import React, { useEffect, useRef, useState } from "react"
import styled from "styled-components"
import { base64UrlEncode } from "../common/base64/base64UrlEncode"
import Loading from "../common/layout/Loading"
import { ModalManagerContext } from "../common/modal/ModalManagerContext"
import { Footer } from "../common/page/Footer"
import { Header } from "../common/page/Header"
import { PageHead } from "../common/page/PageHead"
import { PreferencesModal } from "../common/settings/PreferencesModal"
import { useAutorun } from "../common/state/useAutorun"
import { useLazyValue } from "../common/state/useLazyValue"
import { useRequiredContext } from "../common/state/useRequiredContext"
import { mainDomain } from "../common/utilities/constants"
import { timeout } from "../common/utilities/timeout"
import { Editor } from "../modules/editor/Editor"
import { EditorManager } from "../modules/editor/EditorManager"
import { EditorManagerProvider } from "../modules/editor/EditorManagerContext"
import { getEditorManagerFromQuery } from "../modules/editor/getEditorManagerFromQuery"
import { Preview } from "../modules/message/preview/Preview"

const Container = styled.div`
  display: flex;
  flex-direction: column;

  height: 100%;
`

const View = styled.main.attrs({ translate: "no" })`
  max-height: calc(100% - 48px);

  display: flex;
  flex-direction: row-reverse;
  align-items: stretch;

  flex: 1;

  & > * {
    flex: 1;
    height: 100%;
    overflow-y: scroll;
  }
`

export type MainProps = {
  state: SnapshotOut<typeof EditorManager>
  mobile: boolean
}

function Main(props: MainProps) {
  const editorManager = useLazyValue(() => EditorManager.create(props.state))
  useEffect(() => () => destroy(editorManager), [editorManager])

  const cancelRef = useRef<() => void>()
  useAutorun(() => {
    const messages = editorManager.messages.map(message => ({
      data: message.data,
    }))

    cancelRef.current?.()
    cancelRef.current = timeout(() => {
      const json = JSON.stringify({ messages })
      const base64 = base64UrlEncode(json)

      history.replaceState({ __N: false }, "", `/embed?data=${base64}`)
    }, 500)
  })

  const [activeTab, setActiveTab] = useState<"Preview" | "Editor">("Preview")

  const modalManager = useRequiredContext(ModalManagerContext)
  const spawnSettingsModal = () =>
    modalManager.spawn({ render: () => <PreferencesModal /> })

  return useObserver(() => (
    <EditorManagerProvider value={editorManager}>
      <PageHead title="Invi" description="Discord Embed builder">
        <meta key="referrer" name="referrer" content="strict-origin" />
      </PageHead>
      <Container>
        <Header
          items={[
            { name: "Support", to: "/discord", newWindow: true },
            { name: "Bot", to: "/bot", newWindow: true },
            { name: "Settings", handler: spawnSettingsModal },
            {
              name: "Dashboard",
              to: `https://${mainDomain}/dashboard`,
              newWindow: true,
            },
          ]}
          tabs={
            props.mobile
              ? {
                items: ["Editor", "Preview"],
                current: activeTab,
                onChange: setActiveTab,
              }
              : undefined
          }
        />
        <View>
          {(!props.mobile || activeTab === "Preview") && (
            <div>
              <Preview />
            </div>
          )}
          {(!props.mobile || activeTab === "Editor") && (
            <div>
              <Editor />
              <Footer />
            </div>
          )}
        </View>
      </Container>
    </EditorManagerProvider>
  ))
}

export default function App() {
  const query = useRouter().query

  const [width, setWidth] = useState<number | null>(null)
  useEffect(() => {
    setWidth(window.innerWidth)
    window.addEventListener("resize", () => setWidth(window.innerWidth))
    return () => {
      window.removeEventListener("resize", () => setWidth(window.innerWidth))
    }
  }, [])

  if (!query || !query.data || !width) return <Loading />

  const state = getSnapshot(getEditorManagerFromQuery(query));
  if (!state) return <Loading />

  return <Main state={state} mobile={width <= 768} />
}