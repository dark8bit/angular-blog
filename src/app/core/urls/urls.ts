import { environment } from '../../../environments/environment';

export class Urls {
  private static baseUrl = `https://identitytoolkit.googleapis.com/v1/accounts:`;

  public static signInWithPassword(): string {
    return this.getUrl('signInWithPassword');
  }

  public static postUrl(): string {
    return `${environment.fbDbUrl}/posts.json`;
  }

  public static getPostById(id: string): string {
    return `${environment.fbDbUrl}/posts/${id}.json`;
  }

  /**
   * get full Url
   * @param url - string
   */
  private static getUrl(url: string): string {
    return `${this.baseUrl}${url}?key=${environment.apiKey}`;
  }
}
