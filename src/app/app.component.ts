import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [FormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{

  title = 'angular-imenik';
  ime: string = '';
  broj: string = '';
  keyValuePairs: { key: string; value: string }[] = [];
  zaIzmenu: string | null = null;

  constructor(private localStorageService: LocalStorageService) {  }

  ngOnInit(): void {
    if (typeof window !== 'undefined' && typeof this.localStorageService !== 'undefined') {
      this.retrieveFromLocalStorage();
    } else {
      console.warn('localStorage nije trenutno dostupan.');
    }
  }

  saveToLocalStorage(): void {
    if (this.ime.trim() === '' || this.broj.trim() === '') {
      alert('Oba polja su obavezna!');
      return;
    }

    if (this.zaIzmenu) {
      this.localStorageService.removeItem(this.zaIzmenu);
      this.localStorageService.setItem(this.ime, this.broj);
      this.zaIzmenu = null;
    } else {
      this.localStorageService.setItem(this.ime, this.broj);
    }
    this.ime = '';
    this.broj = '';
    this.retrieveFromLocalStorage();
  }

  deleteAllFromLocalStorage(): void {
    this.localStorageService.clear();
    this.keyValuePairs = [];
  }

  onDelete(key: string): void {
    this.localStorageService.removeItem(key);
    this.retrieveFromLocalStorage();
  }
  onEdit(key: string, value: string): void {
    this.ime = key;
    this.broj = value;
    this.zaIzmenu = key;
  }

  retrieveFromLocalStorage(): void {
    this.keyValuePairs = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i) || '';
      const value = localStorage.getItem(key) || '';
      this.keyValuePairs.push({ key, value });
    }
  }

  cancel(): void {
    this.ime = '';
    this.broj = '';
    this.zaIzmenu = null;
  }
}
