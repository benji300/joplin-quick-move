import joplin from 'api';
import { Path } from 'api/types';

/**
 * Helper class for data accesses.
 */
export class DA {

  private static async getAll(path: Path, query: any): Promise<any[]> {
    query.page = 1;
    let response = await joplin.data.get(path, query);
    // console.log(`response: ${JSON.stringify(response)}`);
    let result = !!response.items ? response.items : [];
    while (!!response.has_more) {
      // console.log(`has_more`);
      query.page += 1;
      response = await joplin.data.get(path, query);
      result.concat(response.items)
    }
    // console.log(`result: ${JSON.stringify(result)}`);
    return result;
  }

  /**
   * Gets all folders sorted by their title.
   * By default it includes the fields: id, title, parent_id
   */
  static async getFolders(extraFields?: string[]): Promise<any[]> {
    try {
      const fields: string[] = ['id', 'title', 'parent_id'];
      if (extraFields) fields.push(...extraFields);
      return await DA.getAll(['folders'], { fields: fields, order_by: 'title', order_dir: 'ASC', page: 1 });
    } catch (e) {
      return [];
    }
  }

  /**
   * Gets all folders sorted by their title and filter by the handled predicate.
   * By default it includes the fields: id, title, parent_id
   */
  static async getFoldersFiltered(predicate: (value: any, index: number, array: any[]) => unknown, extraFields?: string[]): Promise<any[]> {
    try {
      const fields: string[] = ['id', 'title', 'parent_id'];
      if (extraFields) fields.push(...extraFields);
      const folders: any[] = await DA.getAll(['folders'], { fields: fields, order_by: 'title', order_dir: 'ASC', page: 1 })
      return folders.filter(predicate);
    } catch (e) {
      return [];
    }
  }

  // /**
  //  * Gets all subfolders of the handled folder sorted by their title.
  //  * By default it includes the fields: id, title, parent_id
  //  */
  // DOES NOT WORK
  // static async getAllSubFolders(folderId: string, extraFields?: string[]): Promise<any[]> {
  //   try {
  //     const fields: string[] = ['id', 'title', 'parent_id'];
  //     if (extraFields) fields.push(...extraFields);
  //     return await DA.getAll(['folders', folderId, 'folders'], { fields: fields, order_by: 'title', order_dir: 'ASC', page: 1 });
  //   } catch (e) {
  //     return [];
  //   }
  // }

  /**
   * Gets the folder with the handle ID from the database or null. Including the specified fields.
   * By default it includes the fields: id, title
   */
  static async getFolder(id: string, extraFields?: string[]): Promise<any | null> {
    try {
      const fields: string[] = ['id', 'title', 'parent_id'];
      if (extraFields) fields.push(...extraFields);
      return await joplin.data.get(['folders', id], { fields: fields });
    } catch (e) {
      return null;
    }
  }

  // /**
  //  * Gets the folder with the handle title from the database or null. Including the specified fields.
  //  * By default it includes the fields: id, title
  //  */
  // static async getFolderWithTitle(title: string, extraFields?: string[]): Promise<any | null> {
  //   try {
  //     const folders: any[] = await DA.getFolders(extraFields);
  //     if (folders) return folders.find(x => x.title === title);
  //     return null;
  //   } catch (e) {
  //     return null;
  //   }
  // }

  /**
   * Gets All notes from the database.
   * By default it includes the fields: id, title, is_todo, todo_completed
   */
  static async getNotes(extraFields?: string[]): Promise<any[]> {
    // TODO implement extraFields
    // TODO sort notes
    const fields: string[] = ['id', 'title', 'is_todo', 'todo_completed'];
    return await DA.getAll(['notes'], { fields: fields, page: 1 });
    // console.log(`notes: ${JSON.stringify(notes)}`);
    // return notes;
  }

  // TODO getNotesFiltered

  // TODO getNotesOfFolder (Filtered)
  // await DATA.get(['folders', selectedNote.parent_id, 'notes'], { fields: ['id', 'title', 'order'], order_by: 'order', order_dir: 'DESC' });

  /**
   * Gets the note with the handle ID from the database or null. Including the specified fields.
   * By default it includes the fields: id, title, is_todo, todo_completed
   */
  static async getNote(id: string, extraFields?: string[]): Promise<any | null> {
    try {
      const fields: string[] = ['id', 'title', 'is_todo', 'todo_completed'];
      if (extraFields) fields.push(...extraFields);
      return await joplin.data.get(['notes', id], { fields: fields });
    } catch (e) {
      return null;
    }
  }

  // /**
  //  * Gets the note with the handle title from the database or null. Including the specified fields.
  //  * By default it includes the fields: id, title, is_todo, todo_completed
  //  */
  // static async getNoteWithTitle(title: string, extraFields?: string[]): Promise<any> {
  //   return (await DA.getNotes(extraFields)).find(x => x.title === title);
  // }

  // TODO getTags (Filtered)
  // TODO getTagsOfNote

}