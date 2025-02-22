import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { openDB } from 'idb';

@Component({
  selector: 'app-data-view',
  templateUrl: './data-view.component.html',
  styleUrls: ['./data-view.component.css']
})
export class DataViewComponent implements OnInit {
  data: any[] = [];
  displayedColumns: string[] = ['serialNumber', 'email', 'mobile', 'role', 'name', 'age', 'financialGoals'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatSort) sort!: MatSort;

  async ngOnInit() {
    const dbName = 'FinanceTrackerDB';
    const storeName = 'userInfo';

    const db = await openDB(dbName, 1);
    const transaction = db.transaction(storeName, 'readonly');
    const store = transaction.objectStore(storeName);
    const allData = await store.getAll();

    this.data = allData.map((item, index) => {
      let obj: any = {
        serialNumber: index + 1,
        email: item?.email || "",
        mobile: item?.mobile || "",
        name: '',
        age: '',
        role: "",
        financialGoals: ''
      };

      if (item?.selectedIndividual) {
        obj.role = "Individual_" + item?.selectedIndividual || "";
        obj.name = item?.customerProfile?.name || "";
        obj.age = item?.customerProfile?.age || "";
        obj.financialGoals = item?.customerProfile?.financialGoals ? this.formatFinancialGoals(item?.customerProfile?.financialGoals) : "";
      } else if (item?.selectedBusiness) {
        obj.role = "Business_" + item?.selectedBusiness || "";
        obj.name = item?.selectedExistingBusiness?.name || "";
        obj.age = '';
        obj.financialGoals = item?.selectedExistingBusiness?.natureOfBusiness || "";
      }

      return obj;
    });

    this.dataSource = new MatTableDataSource(this.data);
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  formatFinancialGoals(financialGoals: any): string {
    return Object.keys(financialGoals)
      .filter(key => financialGoals[key])
      .join(', ');
  }
}