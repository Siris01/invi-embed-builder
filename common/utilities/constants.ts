export const domain = "https://embed.invi.one"
export const mainDomain = "https://invi.one"
export const discohook = "https://discohook.org"
export const discohookSource = "https://github.com/discohook/site"
export const source = "https://github.com/Siris01/invi-embed-builder"

export const joinVariables = [
	{name: "user_id", description: "The id of the user who joined"},
	{name: "user_tag", description: "The tag (username + discriminator) of the user who joined"},
	{name: "user_mention", description: "The mention of the user who joined"},
	{name: "user_created_date", description: "The creation date (in discord format) of the user who joined"},
	{name: "user_joined_date", description: "The joining date (in discord format) of the user who joined"}, // TODO add more vars here 
	{name: "inviter_id", description: "The user id of the inviter"},
	{name: "inviter_tag", description: "The tag (username + discriminator) of the inviter"},
	{name: "inviter_mention", description: "The mention of the inviter"},
	{name: "inviter_invites_total", description: "The total number of invites of the inviter"},
	{name: "inviter_invites_joins", description: "The number of joins of the inviter"},
	{name: "inviter_invites_leaves", description: "The number of leaves of the inviter"},
	{name: "inviter_invites_bonus", description: "The number of bonus invites of the inviter"},
	{name: "invite_code", description: "The invite code used by the user"},
	{name: "invite_channel", description: "The invite channel (discord mention) of the invite code"},
	{name: "invite_uses", description: "The number of uses that the invite code has"},
	{name: "guild_name", description: "The name of your server"},
	{name: "guild_membercount", description: "The number of members (including bots) in your server"},
	{name: "https://cdn.discordapp.com/avatars/user", description: "The avatar URL of the user who joined"},
	{name: "https://cdn.discordapp.com/avatars/server", description: "The avatar URL of the server"},
	{name: "https://cdn.discordapp.com/avatars/inviter", description: "The avatar URL of the inviter"},
]

export const leaveVariables = [
	{name: "user_id", description: "The id of the user who left"},
	{name: "user_tag", description: "The tag (username + discriminator) of the user who left"},
	{name: "user_mention", description: "The mention of the user who left"},
	{name: "user_created_date", description: "The creation date (in discord format) of the user who left"},
	{name: "user_joined_date", description: "The joining date (in discord format) of the user who left"},
	{name: "inviter_id", description: "The user id of the inviter"},
	{name: "inviter_tag", description: "The tag (username + discriminator) of the inviter"},
	{name: "inviter_mention", description: "The mention of the inviter"},
	{name: "inviter_invites_total", description: "The total number of invites of the inviter"},
	{name: "inviter_invites_joins", description: "The number of joins of the inviter"},
	{name: "inviter_invites_leaves", description: "The number of leaves of the inviter"},
	{name: "inviter_invites_bonus", description: "The number of bonus invites of the inviter"},
	{name: "guild_name", description: "The name of your server"},
	{name: "guild_membercount", description: "The number of members (including bots) in your server"},
	{name: "https://cdn.discordapp.com/avatars/user", description: "The avatar URL of the user who left"},
	{name: "https://cdn.discordapp.com/avatars/server", description: "The avatar URL of the server"},
	{name: "https://cdn.discordapp.com/avatars/inviter", description: "The avatar URL of the inviter"},
]