# Joplin Quick Move

Quick Move is a plugin to extend the UX of [Joplin's](https://joplinapp.org/) desktop application.

It provides a collection of [commands](#commands) to quickly move notes to other notebooks without user interaction.

> :warning: **CAUTION** - Requires Joplin **v1.7.10** or newer

## Table of contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Commands](#commands)
  - [Keyboard shortcuts](#keyboard-shortcuts)
- [User options](#user-options)
- [Feedback](#feedback)
- [Support](#support)
- [Development](#development)
- [Changes](#changes)
- [License](#license)

## Features

- Provides commands to quickly [move notes to specified notebooks](#usage) without interaction

## Installation

### Automatic (Joplin v1.6.4 and newer)

- Open Joplin and navigate to `Tools > Options > Plugins`
- Search for the plugin name and press install
- Restart Joplin to enable the plugin

### Manual

- Download the latest released JPL package (`*.jpl`) from [here](https://github.com/benji300/joplin-quick-move/releases)
- Open Joplin and navigate to `Tools > Options > Plugins`
- Press `Install plugin` and select the previously downloaded `jpl` file
- Confirm selection
- Restart Joplin to enable the plugin

### Uninstall

- Open Joplin and navigate to `Tools > Options > Plugins`
- Search for the plugin name and press `Delete` to remove the plugin completely
  - Alternatively you can also disable the plugin by clicking on the toggle button
- Restart Joplin

## Usage

1. [Install](#installation) the plugin

1. Navigate to the settings/options view and select the `Quick Move` tab

1. Select notebooks for the quick move actions (to be used) to enable quick moving of notes

1. Assign [keyboard shortcuts](#keyboard-shortcuts) to the corresponding quick move action [commands](#commands)

## Commands

This plugin provides additional commands as described in the following table.

| Command Label       | Command ID   | Default Key         | Menu contexts     |
| ------------------- | ------------ | ------------------- | ----------------- |
| Quick move action 1 | `quickMove1` | `CmdOrCtrl+Shift+1` | `Note>Quick move` |
| Quick move action 2 | `quickMove2` | `CmdOrCtrl+Shift+2` | `Note>Quick move` |
| Quick move action 3 | `quickMove3` | `CmdOrCtrl+Shift+3` | `Note>Quick move` |
| Quick move action 4 | `quickMove4` | `CmdOrCtrl+Shift+4` | `Note>Quick move` |
| Quick move action 5 | `quickMove5` | `CmdOrCtrl+Shift+5` | `Note>Quick move` |
| Quick move action 6 | `quickMove6` | `CmdOrCtrl+Shift+6` | `Note>Quick move` |
| Quick move action 7 | `quickMove7` | `CmdOrCtrl+Shift+7` | `Note>Quick move` |
| Quick move action 8 | `quickMove8` | `CmdOrCtrl+Shift+8` | `Note>Quick move` |
| Quick move action 9 | `quickMove9` | `CmdOrCtrl+Shift+9` | `Note>Quick move` |

Quickly move the selected note(s) to a predefined notebook. The notebooks can be defined in the [user options](#user-options).

### Keyboard shortcuts

Keyboard shortcuts can be assigned in user options via `Tools > Options > Keyboard Shortcuts` to all [commands](#commands) which are assigned to the `Note` menu context.
In the keyboard shortcut editor, search for the command label where shortcuts shall be added.

## User options

This plugin adds provides user options which can be changed via `Tools > Options > Quick Move` (Windows App).

> **NOTE** - The notebook selection lists are only updated at startup. To display new or renamed notebooks, Joplin must be restarted.

## Feedback

- :question: Need help?
  - Ask a question on the [Joplin Forum](https://discourse.joplinapp.org/c/plugins/18) (TODO: Paste link to thread)
- :bulb: An idea to improve or enhance the plugin?
  - Start a new discussion on the [Forum](https://discourse.joplinapp.org/c/plugins/18) or upvote [popular feature requests](https://github.com/benji300/joplin-commands/issues?q=is%3Aissue+is%3Aopen+label%3Aenhancement+sort%3Areactions-%2B1-desc+)
- :bug: Found a bug?
  - Check the [Forum](https://discourse.joplinapp.org/c/plugins/18) if anyone else already reported the same issue. Otherwise report it by yourself.

## Support

You like this plugin as much as I do and it improves your daily work with Joplin?

Then I would be very happy if you buy me a :beer: or :coffee: via [PayPal](https://www.paypal.com/donate?hosted_button_id=6FHDGK3PTNU22) :wink:

## Development

The npm package of the plugin can be found [here](https://www.npmjs.com/package/joplin-plugin-quick-move).

### Building the plugin

If you want to build the plugin by your own simply run `npm run dist`.

### Updating the plugin framework

To update the plugin framework, run `npm run update`.

## Changes

See [CHANGELOG](./CHANGELOG.md) for details.

## License

Copyright (c) 2021 Benjamin Seifert

MIT License. See [LICENSE](./LICENSE) for more information.
