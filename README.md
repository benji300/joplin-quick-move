# Joplin Command Collection

Command Collection is a plugin to extend the UX of [Joplin's](https://joplinapp.org/) desktop application.

It provides a collection of [new commands](#new-commands) to improve and speed up your daily work with the keyboard in Joplin.
Furthermore it maps also some [internal commands](#mapped-commands) to the main menu to allow to assign keyboard shortcuts to them.

> :warning: **CAUTION** - Requires Joplin **v1.6.5** or newer

## Table of contents

- [Features](#features)
- [Installation](#installation)
- [Commands](#commands)
  - [New commands](#new-commands)
    - [Copy notebook name](#copy-notebook-name)
    - [Copy notebook ID](#copy-notebook-id)
    - [Copy note name](#copy-note-name)
    - [Copy note ID](#copy-note-id)
    - [Copy Markdown link](#copy-markdown-link)
    - [Toggle to-do state](#toggle-to-do-state)
    - [Set URL](#set-url)
    - [Open URL in browser](#Open-url-in-browser)
    - [Touch note](#touch-note)
    - [Move note in list](#Move-note-in-list)
    - [Quick move note](#quick-move-note)
  - [Mapped commands](#mapped-commands)
  - [Keyboard shortcuts](#keyboard-shortcuts)
- [User options](#user-options)
- [Feedback](#feedback)
- [Support](#support)
- [Development](#development)
- [Changes](#changes)
- [License](#license)

## Features

- Add [new commands](#new-commands) to ...
  - Update note properties (e.g. [Toggle to-do state](#toggle-to-do-state))
  - [Move note](#move-note-in-list) in current note list
  - Quickly [move note to notebook](#quick-move-note) without interaction
  - and more...
- Map Joplin [internal commands](#mapped-commands) to the main menu
  - Allows to assign keyboard shortcuts to them

## Installation

### Automatic (Joplin v1.6.4 and newer)

- Currently not supported

### Manual

- Download the latest released JPL package (`*.jpl`) from [here](https://github.com/benji300/joplin-commands/releases)
- Open Joplin and navigate to `Tools > Options > Plugins`
- Press `Install plugin` and select the previously downloaded `jpl` file
- Confirm selection
- Restart Joplin to enable the plugin

### Uninstall

- Open Joplin and navigate to `Tools > Options > Plugins`
- Search for the `Command Collection` plugin
- Press `Delete` to remove the plugin completely
  - Alternatively you can also disable the plugin by clicking on the toggle button
- Restart Joplin

## Commands

### New commands

This plugin provides the commands as described in the following chapters.

> **NOTE** - Keyboard shortcuts can be assigned in user options via `Tools > Options > Keyboard Shortcuts`. Search for the command label where shortcuts shall be added.

> **NOTE** - All commands can also be accessed via the `Command palette`.

#### Copy notebook name

| Command Label      | Command ID       | Default Key | Menu contexts     |
| ------------------ | ---------------- | ----------- | ----------------- |
| Copy notebook name | `copyFolderName` | -           | `NotebookContext` |

Copy the name of the selected notebook to the clipboard. If triggered via command palette, the parent notebook name of the selected note is copied.

#### Copy notebook ID

| Command Label    | Command ID     | Default Key | Menu contexts     |
| ---------------- | -------------- | ----------- | ----------------- |
| Copy notebook ID | `copyFolderId` | -           | `NotebookContext` |

Copy the ID of the selected notebook to the clipboard. If triggered via command palette, the parent notebook ID of the selected note is copied.

#### Copy note name

| Command Label  | Command ID     | Default Key | Menu contexts                        |
| -------------- | -------------- | ----------- | ------------------------------------ |
| Copy note name | `copyNoteName` | -           | `Note>Properties`, `NoteListContext` |

Copy the name of the selected note(s) to the clipboard.

#### Copy note ID

| Command Label | Command ID   | Default Key | Menu contexts     |
| ------------- | ------------ | ----------- | ----------------- |
| Copy note ID  | `copyNoteId` | -           | `Note>Properties` |

Copy the ID of the selected note(s) to the clipboard.

#### Copy Markdown link

| Command Label     | Command ID         | Default Key | Menu contexts     |
| ----------------- | ------------------ | ----------- | ----------------- |
| Copy Markown link | `copyMarkdownLink` | -           | `Note>Properties` |

Basically a replica of the internal command. But with an entry in the main menu, so that a keyboard shortcut can be assigned to it.
Also the command is available via the command palette now.

#### Toggle to-do state

| Command Label      | Command ID        | Default Key             | Menu contexts                        |
| ------------------ | ----------------- | ----------------------- | ------------------------------------ |
| Toggle to-do state | `toggleTodoState` | `CmdOrCtrl+Shift+Space` | `Note>Properties`, `NoteListContext` |

Toggle the state of the selected to-do(s).

#### Set URL

| Command Label | Command ID | Default Key | Menu contexts     |
| ------------- | ---------- | ----------- | ----------------- |
| Set URL       | `editURL`  | -           | `Note>Properties` |

Opens dialog to edit the URL of the note.

#### Open URL in browser

| Command Label       | Command ID | Default Key | Menu contexts                    |
| ------------------- | ---------- | ----------- | -------------------------------- |
| Open URL in browser | `openURL`  | `-`         | `Note>Properties`, `NoteToolbar` |

Opens the note source URL in the system's default browser.

#### Touch note

| Command Label | Command ID  | Default Key | Menu contexts       |
| ------------- | ----------- | ----------- | ------------------- |
| Touch note    | `touchNote` | -           | `Note>Move in list` |

"Touch" the last updated timestamp of the selected note and set it to now.
Useful to move a note to the top of a list when the 'Updated date' sort is active.

> **NOTE** - Title or content of the note are _not_ changed

#### Move note in list

| Command Label  | Command ID     | Default Key          | Menu contexts       |
| -------------- | -------------- | -------------------- | ------------------- |
| Move to top    | `moveToTop`    | `CmdOrCtrl+num8`     | `Note>Move in list` |
| Move up        | `moveUp`       | `CmdOrCtrl+Alt+num8` | `Note>Move in list` |
| Move down      | `moveDown`     | `CmdOrCtrl+num2`     | `Note>Move in list` |
| Move to bottom | `moveToBottom` | `CmdOrCtrl+Alt+num2` | `Note>Move in list` |

Change the position of a note in the current note list (notebook), if `Sort notes by` is set to `Custom order`.

> **NOTE** - Sorting in `All notes` is _not_ possible

> **NOTE** - The default keys using num keys in order to trigger the commands also when focus is set to note list

#### Quick move note

| Command Label   | Command ID   | Default Key         | Menu contexts           |
| --------------- | ------------ | ------------------- | ----------------------- |
| Move to: `name` | `quickMove1` | `CmdOrCtrl+Shift+1` | `Note>Move to notebook` |
| Move to: `name` | `quickMove2` | `CmdOrCtrl+Shift+2` | `Note>Move to notebook` |
| Move to: `name` | `quickMove3` | `CmdOrCtrl+Shift+3` | `Note>Move to notebook` |
| Move to: `name` | `quickMove4` | `CmdOrCtrl+Shift+4` | `Note>Move to notebook` |
| Move to: `name` | `quickMove5` | `CmdOrCtrl+Shift+5` | `Note>Move to notebook` |

Quickly move (without interaction) selected note to one of five predefined notebooks.

> **NOTE** - `name` is the user defined name of the notebook. See [user options](#user-options) for details

### Mapped commands

The following internal commands are mapped to main menu entries. This allows to assign keyboard shortcuts to them.

| Command Label    | Command ID     | Default Key         | Menu contexts           |
| ---------------- | -------------- | ------------------- | ----------------------- |
| Checkbox         | `textCheckbox` | `CmdOrCtrl+Shift+C` | `Edit`                  |
| Set alarm        | `editAlarm`    | -                   | `Note>Properties`       |
| Move to notebook | `moveToFolder` | `CmdOrCtrl+Shift+M` | `Note>Move to notebook` |

### Keyboard shortcuts

Keyboard shortcuts can be assigned in user options via `Tools > Options > Keyboard Shortcuts` to all [commands](#commands) which are assigned to any main menu entry (e.g. `Tools`).
In the keyboard shortcut editor, search for the command label where shortcuts shall be added.

## User options

This plugin adds provides user options which can be changed via `Tools > Options > Command Collection`.

> **NOTE** - Changes to the quick move actions are only applied after a restart of the app.

## Feedback

- :question: Need help?
  - Ask a question on the [Joplin Forum](https://discourse.joplinapp.org/c/plugins/18) (TODO: Paste link to thread)
- :bulb: An idea to improve or enhance the plugin?
  - Start a new discussion on the [Forum](https://discourse.joplinapp.org/c/plugins/18) or upvote [popular feature requests](https://github.com/benji300/joplin-commands/issues?q=is%3Aissue+is%3Aopen+label%3Aenhancement+sort%3Areactions-%2B1-desc+)
- :bug: Found a bug?
  - Check the [Forum](https://discourse.joplinapp.org/c/plugins/18) if anyone else already reported the same issue. Otherwise report it by yourself.

## Support

You like this plugin as much as I do and it improves your daily work with Joplin?

Then I would be very happy if you buy me a beer via [PayPal](https://www.paypal.com/donate?hosted_button_id=6FHDGK3PTNU22) :wink::beer:

## Development

### Building the plugin

If you want to build the plugin by your own simply run `npm run dist`.

### Updating the plugin framework

To update the plugin framework, run `npm run update`.

## Changes

See [CHANGELOG](./CHANGELOG.md) for details.

## License

Copyright (c) 2021 Benjamin Seifert

MIT License. See [LICENSE](./LICENSE) for more information.
