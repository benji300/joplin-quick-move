import joplin from 'api';
import { MenuItem, MenuItemLocation } from 'api/types';
import { ChangeEvent } from 'api/JoplinSettings';
import { Settings, DefaultKeys } from './settings';
import { DA } from './data';

joplin.plugins.register({
  onStart: async function () {
    const COMMANDS = joplin.commands;
    const DATA = joplin.data;
    const SETTINGS = joplin.settings;
    const WORKSPACE = joplin.workspace;
    // settings
    const settings: Settings = new Settings();
    await settings.register();

    //#region HELPERS

    async function quickMoveToFolder(actionId: number, quickMoveFolderId: string, noteIds: string[]) {
      if (quickMoveFolderId === undefined || quickMoveFolderId === '0') return;

      // get selected note ids and return if empty
      let selectedNoteIds = noteIds;
      if (!selectedNoteIds) selectedNoteIds = await WORKSPACE.selectedNoteIds();
      if (!selectedNoteIds) return;

      // check if folder still exists
      try {
        await DA.getFolderWithId(quickMoveFolderId);
      } catch (err) {
        await joplin.views.dialogs.showMessageBox(`Selected notebook of quick move action ${actionId} does not exist. Please select another notebook in the settings.`);
        return;
      }

      // move each selected note to new folder
      let lastNoteId = '';
      for (const noteId of selectedNoteIds) {
        lastNoteId = noteId;
        await DATA.put(['notes', noteId], null, { parent_id: quickMoveFolderId });
      }

      // keep last moved note selected if enabled
      if (settings.keepMovedNoteSelected && lastNoteId) {
        COMMANDS.execute('openNote', lastNoteId);
      }
    }

    //#endregion

    //#region COMMANDS

    // Command: quickMove1
    // Desc: Move the selected note(s) directly to the specified folder
    await COMMANDS.register({
      name: 'quickMove1',
      label: `Quick move action 1`,
      iconName: 'fas fa-shipping-fast',
      enabledCondition: 'someNotesSelected',
      execute: async (noteIds: string[]) => {
        quickMoveToFolder(1, settings.quickMove1, noteIds);
      }
    });

    // Command: quickMove2
    await COMMANDS.register({
      name: 'quickMove2',
      label: `Quick move action 2`,
      iconName: 'fas fa-shipping-fast',
      enabledCondition: 'someNotesSelected',
      execute: async (noteIds: string[]) => {
        quickMoveToFolder(2, settings.quickMove2, noteIds);
      }
    });

    // Command: quickMove3
    await COMMANDS.register({
      name: 'quickMove3',
      label: `Quick move action 3`,
      iconName: 'fas fa-shipping-fast',
      enabledCondition: 'someNotesSelected',
      execute: async (noteIds: string[]) => {
        quickMoveToFolder(3, settings.quickMove3, noteIds);
      }
    });

    // Command: quickMove4
    await COMMANDS.register({
      name: 'quickMove4',
      label: `Quick move action 4`,
      iconName: 'fas fa-shipping-fast',
      enabledCondition: 'someNotesSelected',
      execute: async (noteIds: string[]) => {
        quickMoveToFolder(4, settings.quickMove4, noteIds);
      }
    });

    // Command: quickMove5
    await COMMANDS.register({
      name: 'quickMove5',
      label: `Quick move action 5`,
      iconName: 'fas fa-shipping-fast',
      enabledCondition: 'someNotesSelected',
      execute: async (noteIds: string[]) => {
        quickMoveToFolder(5, settings.quickMove5, noteIds);
      }
    });

    // Command: quickMove6
    await COMMANDS.register({
      name: 'quickMove6',
      label: `Quick move action 6`,
      iconName: 'fas fa-shipping-fast',
      enabledCondition: 'someNotesSelected',
      execute: async (noteIds: string[]) => {
        quickMoveToFolder(6, settings.quickMove6, noteIds);
      }
    });

    // Command: quickMove7
    await COMMANDS.register({
      name: 'quickMove7',
      label: `Quick move action 7`,
      iconName: 'fas fa-shipping-fast',
      enabledCondition: 'someNotesSelected',
      execute: async (noteIds: string[]) => {
        quickMoveToFolder(7, settings.quickMove7, noteIds);
      }
    });

    // Command: quickMove8
    await COMMANDS.register({
      name: 'quickMove8',
      label: `Quick move action 8`,
      iconName: 'fas fa-shipping-fast',
      enabledCondition: 'someNotesSelected',
      execute: async (noteIds: string[]) => {
        quickMoveToFolder(8, settings.quickMove8, noteIds);
      }
    });

    // Command: quickMove9
    await COMMANDS.register({
      name: 'quickMove9',
      label: `Quick move action 9`,
      iconName: 'fas fa-shipping-fast',
      enabledCondition: 'someNotesSelected',
      execute: async (noteIds: string[]) => {
        quickMoveToFolder(9, settings.quickMove9, noteIds);
      }
    });

    // prepare quick move submenu
    const quickMoveSubmenu: MenuItem[] = [
      {
        commandName: 'quickMove1',
        accelerator: DefaultKeys.QuickMove1
      },
      {
        commandName: 'quickMove2',
        accelerator: DefaultKeys.QuickMove2
      },
      {
        commandName: 'quickMove3',
        accelerator: DefaultKeys.QuickMove3
      },
      {
        commandName: 'quickMove4',
        accelerator: DefaultKeys.QuickMove4
      },
      {
        commandName: 'quickMove5',
        accelerator: DefaultKeys.QuickMove5
      },
      {
        commandName: 'quickMove6',
        accelerator: DefaultKeys.QuickMove6
      },
      {
        commandName: 'quickMove7',
        accelerator: DefaultKeys.QuickMove7
      },
      {
        commandName: 'quickMove8',
        accelerator: DefaultKeys.QuickMove8
      },
      {
        commandName: 'quickMove9',
        accelerator: DefaultKeys.QuickMove9
      }
    ];

    // add commands to note menu
    await joplin.views.menus.create('menNoteQuickMove', 'Quick move', quickMoveSubmenu, MenuItemLocation.Note);

    // add commands to notes context menu
    // TODO testen ob das mit dem Submenü geht
    // await joplin.views.menuItems.create('notesContextCopyNoteName', 'copyNoteName', MenuItemLocation.NoteListContextMenu);

    // add commands to editor context menu
    // TODO testen ob das mit dem Submenü geht
    // await joplin.views.menuItems.create('editorContextCopyNoteName', 'copyNoteName', MenuItemLocation.EditorContextMenu);

    //#endregion

    //#region EVENTS

    // let onChangeCnt = 0;
    SETTINGS.onChange(async (event: ChangeEvent) => {
      // console.debug(`onChange() hits: ${onChangeCnt++}`);
      await settings.read(event);
    });

    //#endregion
  }
});
