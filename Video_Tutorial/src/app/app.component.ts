import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { ProductService } from './product.service';
import { AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { productModel } from './product.model';
import { LiveAnnouncer } from '@angular/cdk/a11y';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Video_Tutorial';
  // ================================================Video 8(Notifications)
  // notifications = 2;

  // ================================================Video 9(Spinner) 
  // spinner: boolean = false;
  // onLoadData() {
  //   this.spinner = true;
  //   setTimeout(() => {
  //     this.spinner = false;
  //   }, 5000);
  // }

  // ================================================Video 11(Sidenav)
  // open: boolean = true;


  // ================================================Video 20(Select)
  // public selectValue: any;

  // ================================================Video 21(Autocomplete)
  // option: string[] = ["a", "b", "c", "d"];

  // ================================================Video 23(DatePicker)
  // dateFilter = (date: any) => {
  //   const day = date.getDay();
  //   return day != 0 && day != 6;
  // }

  // ===========================================Video 25(Snackbar)Ema ma pachu ek inject kairu MatSnackBar krine 
  // constructor(private snackBar: MatSnackBar) {
  // }
  // openSnackBar(msg1: any, msg2: any) {
  //   let show = this.snackBar.open(msg1, msg2);
  //   show.afterDismissed().subscribe(() => {
  //     console.log("Dismissed");
  //   });
  //   show.onAction().subscribe(() => {
  //     console.log("Action");
  //   });
  // }

  // ================================================Full Project
  displayedColumns: string[] = ['name', 'category', 'date', 'gender', 'price', 'comments', 'actions'];
  dataSource!: MatTableDataSource<productModel>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(private dialog: MatDialog, private productService: ProductService, private _liveAnnouncer: LiveAnnouncer) {
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  openDialogForm() {
    this.dialog.open(DialogComponent, {
      width: '50%'
    });
  }
  ngOnInit() {
    this.getDataProduct();
  }
  getDataProduct() {
    this.productService.getData().subscribe((result) => {
      console.log(result);
      this.dataSource = new MatTableDataSource(result);//Ema badha data aave
      this.dataSource.paginator = this.paginator;//paginator & sort viewchild ma thi aave
      this.dataSource.sort = this.sort;
      // this.products = result;
    });
  }

  announceSortChange(sortState: any) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
  onEdit(row: any) {
    this.dialog.open(DialogComponent, {
      width: '50%',
      data: row
    });

  }
  onDelete(id: any) {
    this.productService.deleteData(id).subscribe((result) => {
      console.log(result);
    })
  }
}



