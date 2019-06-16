import styled from "@emotion/styled";
import React, { ComponentProps, useEffect, useRef, useState } from "react";
import ErrorBoundary from "../ErrorBoundary";
import { Message } from "../message/Message";
import BackupModal from "./backup/BackupModal";
import EditorError from "./EditorError";
import EmbedEditor from "./EmbedEditor";
import FileInput from "./FileInput";
import InputField from "./InputField";
import { parseMessage, stringifyMessage } from "./json/convert";
import JsonInput from "./json/JsonInput";
import { Action, ActionsContainer, ActionsHeader, Button, Container } from "./styles";

interface Props {
  message: Message
  onChange: (message: Message) => void
  files: FileList | undefined
  onFilesChange: (files: FileList | undefined) => void
  onToggleTheme: () => void
  onToggleDisplay: () => void
}

const EditorContainer = styled.div`
  position: relative;
`

const EditorInnerContainer = styled(Container)`
  box-sizing: border-box;
  height: 100vh;
  overflow-y: scroll;
  padding: 8px;

  & > *:not(button) {
    flex-grow: 0;
  }
`

const EditorActionsContainer = styled(ActionsContainer)`
  margin: 8px;
`

export default function Editor(props: Props) {
  const {
    message,
    files,
    onFilesChange: handleFilesChange,
    onToggleTheme: handleToggleTheme,
    onToggleDisplay: handleToggleDisplay,
  } = props

  const [json, setJson] = useState(stringifyMessage(props.message))
  const [errors, setErrors] = useState<string[]>([])

  const handleChange = (message: Message) => {
    const {content,embeds,username,avatarUrl} = message
    const newMessage = {
      content: content || undefined,
      embeds: embeds && embeds.length > 0 ? embeds  : undefined,
      username: username || undefined,
      avatarUrl: avatarUrl || undefined,
    }

    setJson(stringifyMessage(newMessage))
    props.onChange(newMessage)
  }

  useEffect(() => {
    let prevErrors = [...errors]
    const { message, errors: newErrors } = parseMessage(json)

    setErrors(newErrors.filter(filterEmptyMessage))

    if (newErrors.length > 0 && prevErrors.join("\n") !== newErrors.join("\n"))
      console.log("JSON validation errors occurred:", newErrors, message)

    if (message) props.onChange(message)
  }, [json])

  useEffect(() => {
    const { errors } = parseMessage(json)
    setErrors(errors.filter(filterEmptyMessage))
  }, [files])

  const filterEmptyMessage = (error: string) =>
    files && files.length > 0
      ? error !== "message: Expected one of following keys: 'content', 'embeds'"
      : true

  const [webhookUrl, setWebhookUrl] = useState("")
  const [sending, setSending] = useState(false)
  const executeWebhook = async () => {
    setSending(true)

    const formData = new FormData()
    formData.append("payload_json", json)

    if (files)
      for (const [index, file] of Object.entries(files))
        formData.append(`file[${index}]`, file, file.name)

    const response = await fetch(webhookUrl + "?wait=true", {
      method: "POST",
      body: formData,
    })

    setSending(false)
    console.log("Webhook executed:", await response.json())
  }

  const fileInputRef: ComponentProps<typeof FileInput>["ref"] = useRef(null)
  const clearFiles = () => {
    const { current: fileInput } = fileInputRef
    if (fileInput) fileInput.clearFiles()
  }

  const clearAll = () => {
    handleChange({})
    clearFiles()
  }

  const isDisabled = (() => {
    if (sending) return true
    if (webhookUrl.trim().length === 0) return true

    const { content, embeds } = props.message
    if ((typeof content === "string" || embeds) && errors.length > 0)
      return true

    if (files && files.length === 0) return true

    return false
  })()

  const [isBackupModalShown, setIsBackupModalShown] = useState(false)

  return (
    <EditorContainer>
      <EditorInnerContainer
        style={isBackupModalShown ? { overflow: "hidden" } : undefined}
      >
        <EditorActionsContainer>
          <ActionsHeader>Message editor</ActionsHeader>
          <Action onClick={() => setIsBackupModalShown(true)}>Backups</Action>
          <Action onClick={handleToggleTheme}>Toggle theme</Action>
          <Action onClick={handleToggleDisplay}>Toggle display</Action>
          <Action onClick={clearAll}>Clear all</Action>
        </EditorActionsContainer>
        <Container direction="row">
          <InputField
            value={webhookUrl}
            onChange={setWebhookUrl}
            label="Webhook URL"
            placeholder="https://discordapp.com/api/webhooks/..."
          />
          <Button disabled={isDisabled} onClick={executeWebhook}>
            Send
          </Button>
        </Container>
        <ErrorBoundary onError={() => <EditorError />}>
          <InputField
            value={message.content || ""}
            onChange={(content) => handleChange({ ...message, content })}
            label="Message content"
            multiline
          />
          <EmbedEditor
            embeds={message.embeds || []}
            onChange={(embeds) => handleChange({ ...message, embeds })}
          />
          <Container direction="row">
            <InputField
              value={message.username || ""}
              onChange={(username) => handleChange({ ...message, username })}
              label="Override username"
            />
            <InputField
              value={message.avatarUrl || ""}
              onChange={(avatarUrl) => handleChange({ ...message, avatarUrl })}
              label="Override avatar"
            />
          </Container>
        </ErrorBoundary>
        <Container direction="row">
          <FileInput onChange={handleFilesChange} ref={fileInputRef} />
          <Button onClick={clearFiles}>Remove files</Button>
        </Container>
        <JsonInput json={json} onChange={setJson} errors={errors} />
      </EditorInnerContainer>
      {isBackupModalShown && (
        <BackupModal
          message={message}
          files={files}
          onLoad={(backup) => handleChange(backup.message)}
          onClose={() => setIsBackupModalShown(false)}
        />
      )}
    </EditorContainer>
  )
}
