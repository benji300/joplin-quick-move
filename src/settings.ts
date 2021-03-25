import joplin from 'api';
import { SettingItemType } from 'api/types';
import { ChangeEvent } from 'api/JoplinSettings';
import { DA } from './data';

/**
 * Predefined keyboard shortcuts.
 */
export enum DefaultKeys {
  QuickMove1 = 'CmdOrCtrl+Shift+1',
  QuickMove2 = 'CmdOrCtrl+Shift+2',
  QuickMove3 = 'CmdOrCtrl+Shift+3',
  QuickMove4 = 'CmdOrCtrl+Shift+4',
  QuickMove5 = 'CmdOrCtrl+Shift+5',
  QuickMove6 = 'CmdOrCtrl+Shift+6',
  QuickMove7 = 'CmdOrCtrl+Shift+7',
  QuickMove8 = 'CmdOrCtrl+Shift+8',
  QuickMove9 = 'CmdOrCtrl+Shift+9'
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
  private _quickMove9: string = SettingDefaults.Empty;
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

  get quickMove9(): string {
    return this._quickMove9;
  }

  //#endregion

  //#region GLOBAL VALUES

  // get notesSortOrder(): Promise<string> {
  //   return joplin.settings.globalValue('notes.sortOrder.field');
  // }

  // get uncompletedTodosOnTop(): Promise<boolean> {
  //   return joplin.settings.globalValue('uncompletedTodosOnTop');
  // }

  //#endregion

  private async getFoldersToSelect(): Promise<any> {
    // do not use whitespaces - they will be trimmed!
    const indentChars = '. ';
    const maxDepth = 15;

    // get all root folders (w/o parent_id)
    const rootFolders: any[] = await DA.getFoldersFiltered(x => (!x.parent_id));

    // store all folders and subfoldes to map
    const map: Map<string, string> = new Map(); // <folder,id>
    map.set(' ', '0'); // default empty
    const addFolders = async (folders: any[], depth: number, parent?: any) => {
      for (let i = 0; i < folders.length; i++) {
        const folder = folders[i];
        // preferred title
        // unfortunately whitespaces are trimmed from the option values (workaround: '. ')
        const title: string = indentChars.repeat(depth).concat(folder.title);
        // alternative solution (parent / folder)
        // const title: string = (parent) ? `${parent.title} / ${folder.title}` : folder.title;
        map.set(title, folder.id);
        const subfolders: any[] = await DA.getFoldersFiltered(x => x.parent_id === folder.id);
        if (subfolders) await addFolders(subfolders, (depth + 1) < maxDepth ? depth + 1 : maxDepth, folder);
      }
    };
    await addFolders(rootFolders, 0);

    // prepare JSON string to be parsed
    const lastValueInMap: string = Array.from(map)[map.size - 1][1]; // id
    let folderStr: string = '{';
    map.forEach((id: string, folder: string) => {
      folderStr += `"${id}": "${folder}"${(lastValueInMap == id) ? '' : ','} `;
    })
    folderStr += '}';

    // return JSON object
    return JSON.parse(folderStr);
  }

  /**
   * Register settings section with all options and intially read them at the end.
   */
  async register() {
    const folderSelection: any = await this.getFoldersToSelect();

    // settings section
    await joplin.settings.registerSection('qm.settings', {
      label: 'Quick Move',
      iconName: 'fas fa-shipping-fast',
      description: 'The notebook selection lists are only updated at startup. To display new or renamed notebooks, Joplin must be restarted.'
    });

    // private settings
    // none

    // general settings
    await joplin.settings.registerSetting('keepMovedNoteSelected', {
      value: this._keepMovedNoteSelected,
      type: SettingItemType.Bool,
      section: 'qm.settings',
      public: true,
      label: 'Keep moved note selected',
      description: 'If the selected note is moved via one of the quick move actions, it still be selected afterwards. Otherwise the next note within the current notebook is be selected.'
    });
    await joplin.settings.registerSetting('quickMove1', {
      value: this._quickMove1,
      type: SettingItemType.String,
      section: 'qm.settings',
      isEnum: true,
      public: true,
      label: 'Notebook for quick move action 1',
      description: 'Select the notebook to which the selected note(s) can be moved quickly without interaction (e.g. with assigned keyboard shortcut).',
      options: folderSelection
    });
    await joplin.settings.registerSetting('quickMove2', {
      value: this._quickMove2,
      type: SettingItemType.String,
      section: 'qm.settings',
      isEnum: true,
      public: true,
      label: 'Notebook for quick move action 2',
      options: folderSelection
    });
    await joplin.settings.registerSetting('quickMove3', {
      value: this._quickMove3,
      type: SettingItemType.String,
      section: 'qm.settings',
      isEnum: true,
      public: true,
      label: 'Notebook for quick move action 3',
      options: folderSelection
    });
    await joplin.settings.registerSetting('quickMove4', {
      value: this._quickMove4,
      type: SettingItemType.String,
      section: 'qm.settings',
      isEnum: true,
      public: true,
      label: 'Notebook for quick move action 4',
      options: folderSelection
    });
    await joplin.settings.registerSetting('quickMove5', {
      value: this._quickMove5,
      type: SettingItemType.String,
      section: 'qm.settings',
      isEnum: true,
      public: true,
      label: 'Notebook for quick move action 5',
      options: folderSelection
    });
    await joplin.settings.registerSetting('quickMove6', {
      value: this._quickMove6,
      type: SettingItemType.String,
      section: 'qm.settings',
      isEnum: true,
      public: true,
      label: 'Notebook for quick move action 6',
      options: folderSelection
    });
    await joplin.settings.registerSetting('quickMove7', {
      value: this._quickMove7,
      type: SettingItemType.String,
      section: 'qm.settings',
      isEnum: true,
      public: true,
      label: 'Notebook for quick move action 7',
      options: folderSelection
    });
    await joplin.settings.registerSetting('quickMove8', {
      value: this._quickMove8,
      type: SettingItemType.String,
      section: 'qm.settings',
      isEnum: true,
      public: true,
      label: 'Notebook for quick move action 8',
      options: folderSelection
    });
    await joplin.settings.registerSetting('quickMove9', {
      value: this._quickMove8,
      type: SettingItemType.String,
      section: 'qm.settings',
      isEnum: true,
      public: true,
      label: 'Notebook for quick move action 9',
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
    this._quickMove9 = await this.getOrDefault(event, this._quickMove9, 'quickMove9');
  }
}
