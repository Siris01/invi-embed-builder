import Head from "next/head"
import { useRouter } from "next/router"
import React, { ReactNode } from "react"
import { domain } from "../utilities/constants"

const links = [
  {
    rel: "shortcut icon",
    href: "/favicon.ico",
    sizes: "16x16 32x32",
    type: "image/x-icon",
  },
  {
    rel: "icon",
    href: "/app/static/favicon.png",
    sizes: "32x32",
    type: "image/png",
  },
  {
    rel: "icon",
    href: "/app/static/favicon.svg",
    sizes: "any",
    type: "image/svg+xml",
  },
  {
    rel: "mask-icon",
    href: "/app/static/mask-icon.svg",
    type: "image/svg+xml",
  },
].flat()

export type PageHeadProps = {
  title: string
  description: string
  children?: ReactNode
}

export function PageHead(props: PageHeadProps) {
  const { title, description, children } = props

  const router = useRouter()

  return (
    <Head>
      <meta key="charset" charSet="UTF-8" />
      <meta
        key="viewport"
        name="viewport"
        content="width=device-width, initial-scale=1.0"
      />
      <title key="title">{title === "Invi" ? title : `${title} • Invi`}</title>
      <meta key="description" name="description" content={description} />
      <meta key="og:title" property="og:title" content={title} />
      <meta key="og:type" property="og:type" content="website" />
      <meta key="og:image" property="og:image" content="/app/static/logo.png" />
      <meta
        key="og:url"
        property="og:url"
        content={`${domain}${router.pathname}`}
      />
      <meta
        key="og:description"
        property="og:description"
        content={description}
      />
      <meta key="og:site_name" property="og:site_name" content="Invi" />
      <link
        key="canonical"
        rel="canonical"
        href={`${domain}${router.pathname}`}
      />
      {links.map(link => (
        <link key={`${link.rel}: ${link.href}`} {...link} />
      ))}
      <meta key="application-name" name="application-name" content="Invi" />
      <meta key="theme-color" name="theme-color" content="#5865f2" />
      <meta key="color-scheme" name="color-scheme" content="dark light" />
      <meta key="google" name="google" content="notranslate" />
      {children}
    </Head>
  )
}
