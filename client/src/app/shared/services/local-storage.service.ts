import { Injectable } from '@angular/core';

export const LOCAL_STORAGE_ITEMS = {
  ID_TOKEN: 'ID_TOKEN',
  REFRESH_TOKEN: 'REFRESH_TOKEN',
  EXP: 'EXP',
};

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  getItem(name: string): string {
    return localStorage.getItem(name);
  }

  setItem(name: string, value: string): void {
    localStorage.setItem(name, value);
  }

  removeItem(name: string): void {
    localStorage.removeItem(name);
  }
}
