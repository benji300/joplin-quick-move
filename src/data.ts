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
   * Gets All folders from the database.
   * By default it includes the fields: id, title
   */
  static async getAllFolders(extraFields?: string[]): Promise<any[]> {
    // TODO implement extraFields
    const fields: string[] = ['id', 'title', 'parent_id'];
    return await DA.getAll(['folders'], { fields: fields, page: 1 });
  }

  /**
   * Gets the folder with the handle ID from the database or null. Including the specified fields.
   * By default it includes the fields: id, title
   */
  static async getFolderWithId(id: string, extraFields?: string[]): Promise<any> {
    return await joplin.data.get(['folders', id], { fields: ['id', 'title', 'parent_id'] });
    // return (await DA.getAllFolders(extraFields)).find(x => x.id === id);
  }

  /**
   * Gets the folder with the handle title from the database or null. Including the specified fields.
   * By default it includes the fields: id, title
   */
  static async getFolderWithTitle(title: string, extraFields?: string[]): Promise<any> {
    return (await DA.getAllFolders(extraFields)).find(x => x.title === title);
  }

  /**
   * Gets All notes from the database.
   * By default it includes the fields: id, title, is_todo, todo_completed
   */
  static async getAllNotes(extraFields?: string[]): Promise<any[]> {
    // TODO implement extraFields
    const fields: string[] = ['id', 'title', 'is_todo', 'todo_completed'];
    return await DA.getAll(['notes'], { fields: fields, page: 1 });
    // console.log(`notes: ${JSON.stringify(notes)}`);
    // return notes;
  }

  /**
   * Gets the note with the handle ID from the database or null. Including the specified fields.
   * By default it includes the fields: id, title, is_todo, todo_completed
   */
  static async getNoteWithId(id: string, extraFields?: string[]): Promise<any> {
    // TODO implement extraFields
    return await joplin.data.get(['notes', id], { fields: ['id', 'title', 'is_todo', 'todo_completed'] });
  }

  /**
   * Gets the note with the handle title from the database or null. Including the specified fields.
   * By default it includes the fields: id, title, is_todo, todo_completed
   */
  static async getNoteWithTitle(title: string, extraFields?: string[]): Promise<any> {
    return (await DA.getAllNotes(extraFields)).find(x => x.title === title);
  }

}