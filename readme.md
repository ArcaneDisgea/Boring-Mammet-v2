# Boring Mammet v2


## Setup

```
git clone https://github.com/arcanedisgea/REPO_NAME.git

cd REPO_NAME/

yarn install && yarn start
```

You will need to construct a ``config.js`` using the template below and place it in the root directory, next to ``index.js``.

```js
module.exports = {
  prefix: "PREFIX",
  applicationid: "DISCORD APPLICATION ID",
  token: "DISCORD API BOT TOKEN"
};
```

Lastly, you can generate an invite link for your bot using the [Discord Permissions Calculator](https://discordapi.com/permissions.html).

---

## ToDo

- [ ] Site
	- [ ] Admin/Config Panel
	- [ ] Discord OAUTH
- [ ] Moderation
    - [ ] Automoderator
    	- [ ] Auto Ban/Kick on message.
    	- [ ] Auto Ban/Kick on spam/scam/raid.
- [ ] Roles
	- [ ] Auto Roles on join.
	- [ ] Role Menus via Reactions.
	- [ ] Role Commands.
- [ ] XIV
	- [ ] Lodestone Data
		- [ ] Characters
			- [ ] Character Attributes
			- [ ] Character Classes
			- [ ] Character Crafters
			- [ ] Character Saving
			- [ ] Character Achievements 
		- [ ] FC Information
		- [ ] PVP Stats
		- [ ] Deep Dungeon Solo/Group
		- [ ] Server Status
		- [ ] Maintenance
	- [ ] Item Queries
	- [ ] Action Queries
	- [ ] Recipe Queries
	- [ ] FFLogs
		- [ ] Top 5 of X Fight
		- [ ] Specific Characters Best logs of current tier.
	- [ ] Monthly/Weekly/Daily Resets
		- [ ] Fashion Report
		- [ ] Custom Deliveries?
		- [ ] Festivals
- [ ] Fun
	- [ ] Music