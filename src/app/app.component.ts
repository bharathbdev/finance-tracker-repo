import { Component } from '@angular/core';
import { openDB } from 'idb';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'finance-tracker';

  async exportData() {
    const dbName = 'FinanceTrackerDB';
    const storeName = 'userInfo';

    const db = await openDB(dbName, 1);
    const transaction = db.transaction(storeName, 'readonly');
    const store = transaction.objectStore(storeName);
    const allData = await store.getAll();

    const blob = new Blob([JSON.stringify(allData, null, 2)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `${storeName}_export.json`;
    a.click();
  }
}