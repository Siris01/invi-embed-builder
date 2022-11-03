import type { SnapshotIn } from "mobx-state-tree"
import {
  discohook,
  discohookSource,
  source,
} from "../../common/utilities/constants"
import type { EditorManager } from "./EditorManager"

export const DEFAULT_EDITOR_MANAGER_STATE: SnapshotIn<typeof EditorManager> = {
  messages: [
    {
      content: "Hey!",
      embeds: [
        {
          title: "Info",
          description: `This website is a slightly modified fork of [Discohook](${discohook}).\n\n__**Features**__\n▸Edit, preview, share and send embeds\n▸Edit join & leave messages for your server`,
          color: {
            hue: 235,
            saturation: 0.86,
            value: 1,
          },
        },
        {
          title: "Links",
          description: "",
          color: {
            hue: 235,
            saturation: 0.86,
            value: 1,
          },
          fields: [
            {
              name: "Source Codes",
              value: `[Original Source](${discohookSource})\n[This fork](${source})`,
            },
            {
              name: "Website Links",
              value: `[Discohook](${discohook})\n[Invi](${process.env
                .NEXT_PUBLIC_DOMAIN!})`,
            },
          ],
        },
      ],
    },
  ],
}
