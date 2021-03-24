import joplin from 'api';
import { SettingItemType } from 'api/types';
import { ChangeEvent } from 'api/JoplinSettings';
import { DA } from './data';

/**
 * Predefined keyboard shortcuts.
 */
export enum DefaultKeys {
  TextCheckbox = 'CmdOrCtrl+Shift+C',
  ToggleTodoState = 'CmdOrCtrl+Shift+Space',
  MoveToTop = 'CmdOrCtrl+Alt+num8',
  MoveUp = 'CmdOrCtrl+num8',
  MoveDown = 'CmdOrCtrl+num2',
  MoveToBottom = 'CmdOrCtrl+Alt+num2',
  MoveToFolder = 'CmdOrCtrl+Shift+M',
  QuickMove1 = 'CmdOrCtrl+Shift+1',
  QuickMove2 = 'CmdOrCtrl+Shift+2',
  QuickMove3 = 'CmdOrCtrl+Shift+3',
  QuickMove4 = 'CmdOrCtrl+Shift+4',
  QuickMove5 = 'CmdOrCtrl+Shift+5',
  QuickMove6 = 'CmdOrCtrl+Shift+6',
  QuickMove7 = 'CmdOrCtrl+Shift+7',
  QuickMove8 = 'CmdOrCtrl+Shift+8',
}

/**
 * Advanced style setting default values.
 * Used when setting is set to 'default'.
 */
enum SettingDefaults {
  Empty = '0',
  Default = 'default',
  FontFamily = 'Roboto',
  FontSize = 'var(--joplin-font-size)',
  Background = 'var(--joplin-background-color3)',
  HoverBackground = 'var(--joplin-background-color-hover3)', // var(--joplin-background-hover)
  Foreground = 'var(--joplin-color-faded)',
  ActiveBackground = 'var(--joplin-background-color)',
  ActiveForeground = 'var(--joplin-color)',
  DividerColor = 'var(--joplin-divider-color)'
}

/**
 * Definitions of plugin settings.
 */
export class Settings {
  // private settings
  // none
  // general settings
  private _keepMovedNoteSelected: boolean = false;
  private _quickMove1: string = SettingDefaults.Empty;
  private _quickMove2: string = SettingDefaults.Empty;
  private _quickMove3: string = SettingDefaults.Empty;
  private _quickMove4: string = SettingDefaults.Empty;
  private _quickMove5: string = SettingDefaults.Empty;
  private _quickMove6: string = SettingDefaults.Empty;
  private _quickMove7: string = SettingDefaults.Empty;
  private _quickMove8: string = SettingDefaults.Empty;
  // advanced settings
  // none
  // internals
  private _defaultRegExp: RegExp = new RegExp(SettingDefaults.Default, "i");

  constructor() {
  }

  //#region GETTER

  get keepMovedNoteSelected(): boolean {
    return this._keepMovedNoteSelected;
  }

  get quickMove1(): string {
    return this._quickMove1;
  }

  get quickMove2(): string {
    return this._quickMove2;
  }

  get quickMove3(): string {
    return this._quickMove3;
  }

  get quickMove4(): string {
    return this._quickMove4;
  }

  get quickMove5(): string {
    return this._quickMove5;
  }

  get quickMove6(): string {
    return this._quickMove6;
  }

  get quickMove7(): string {
    return this._quickMove7;
  }

  get quickMove8(): string {
    return this._quickMove8;
  }

  //#endregion

  //#region GLOBAL VALUES

  get notesSortOrder(): Promise<string> {
    return joplin.settings.globalValue('notes.sortOrder.field');
  }

  get uncompletedTodosOnTop(): Promise<boolean> {
    return joplin.settings.globalValue('uncompletedTodosOnTop');
  }

  //#endregion

  private async getFoldersToSelect(): Promise<any> {
    const folders: any[] = await DA.getAllFolders();

    let folderStr: string = '{';
    folderStr += `"0": " ", `; // default empty
    for (const folder of folders) {
      let title: string = folder.title;
      if (folder.parent_id) {
        const parent: any = await DA.getFolderWithId(folder.parent_id);
        if (parent && parent.title) {
          title = `${parent.title} / ${folder.title}`;
        }
      }
      const separator: string = (folders.indexOf(folder) == folders.length - 1) ? '' : ',';
      folderStr += `"${folder.id}": "${title}"${separator} `;
    }
    folderStr += '}';
    return JSON.parse(folderStr);
  }

  /**
   * Register settings section with all options and intially read them at the end.
   */
  async register() {
    const folderSelection: any = await this.getFoldersToSelect();

    // settings section
    await joplin.settings.registerSection('commands.settings', {
      label: 'Command Collection',
      iconName: 'fas fa-terminal'
    });

    // private settings
    // none

    // general settings
    await joplin.settings.registerSetting('keepMovedNoteSelected', {
      value: this._keepMovedNoteSelected,
      type: SettingItemType.Bool,
      section: 'commands.settings',
      public: true,
      label: 'Keep moved note selected',
      description: 'If selected note is moved via one of the quick move actions, it still be selected afterwards. Otherwise the next note within the current list is be selected.'
    });
    await joplin.settings.registerSetting('quickMove1', {
      value: this._quickMove1,
      type: SettingItemType.String,
      section: 'commands.settings',
      isEnum: true,
      public: true,
      label: 'Select notebook for quick move action 1.',
      description: 'The notebook to which the selected note(s) can be moved quickly without interaction (e.g. with assigned keyboard shortcut). The notebook selection list is only updated on App restart.',
      options: folderSelection
    });
    await joplin.settings.registerSetting('quickMove2', {
      value: this._quickMove2,
      type: SettingItemType.String,
      section: 'commands.settings',
      isEnum: true,
      public: true,
      label: 'Select notebook for quick move action 2.',
      options: folderSelection
    });
    await joplin.settings.registerSetting('quickMove3', {
      value: this._quickMove3,
      type: SettingItemType.String,
      section: 'commands.settings',
      isEnum: true,
      public: true,
      label: 'Select notebook for quick move action 3.',
      options: folderSelection
    });
    await joplin.settings.registerSetting('quickMove4', {
      value: this._quickMove4,
      type: SettingItemType.String,
      section: 'commands.settings',
      isEnum: true,
      public: true,
      label: 'Select notebook for quick move action 4.',
      options: folderSelection
    });
    await joplin.settings.registerSetting('quickMove5', {
      value: this._quickMove5,
      type: SettingItemType.String,
      section: 'commands.settings',
      isEnum: true,
      public: true,
      label: 'Select notebook for quick move action 5.',
      options: folderSelection
    });
    await joplin.settings.registerSetting('quickMove6', {
      value: this._quickMove6,
      type: SettingItemType.String,
      section: 'commands.settings',
      isEnum: true,
      public: true,
      label: 'Select notebook for quick move action 6.',
      options: folderSelection
    });
    await joplin.settings.registerSetting('quickMove7', {
      value: this._quickMove7,
      type: SettingItemType.String,
      section: 'commands.settings',
      isEnum: true,
      public: true,
      label: 'Select notebook for quick move action 7.',
      options: folderSelection
    });
    await joplin.settings.registerSetting('quickMove8', {
      value: this._quickMove8,
      type: SettingItemType.String,
      section: 'commands.settings',
      isEnum: true,
      public: true,
      label: 'Select notebook for quick move action 8.',
      options: folderSelection
    });

    // advanced settings
    // none

    // initially read settings
    await this.read();
  }

  private async getOrDefault(event: ChangeEvent, localVar: any, setting: string, defaultValue?: string): Promise<any> {
    const read: boolean = (!event || event.keys.includes(setting));
    if (read) {
      const value: string = await joplin.settings.value(setting);
      if (defaultValue && value.match(this._defaultRegExp)) {
        return defaultValue;
      } else {
        return value;
      }
    }
    return localVar;
  }

  /**
   * Update settings. Either all or only changed ones.
   */
  async read(event?: ChangeEvent) {
    this._keepMovedNoteSelected = await this.getOrDefault(event, this._keepMovedNoteSelected, 'keepMovedNoteSelected');
    this._quickMove1 = await this.getOrDefault(event, this._quickMove1, 'quickMove1');
    this._quickMove2 = await this.getOrDefault(event, this._quickMove2, 'quickMove2');
    this._quickMove3 = await this.getOrDefault(event, this._quickMove3, 'quickMove3');
    this._quickMove4 = await this.getOrDefault(event, this._quickMove4, 'quickMove4');
    this._quickMove5 = await this.getOrDefault(event, this._quickMove5, 'quickMove5');
    this._quickMove6 = await this.getOrDefault(event, this._quickMove6, 'quickMove6');
    this._quickMove7 = await this.getOrDefault(event, this._quickMove7, 'quickMove7');
    this._quickMove8 = await this.getOrDefault(event, this._quickMove8, 'quickMove8');
  }
}
