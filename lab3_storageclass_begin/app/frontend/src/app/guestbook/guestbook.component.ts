import {Component, OnInit, ViewChild, ChangeDetectorRef} from '@angular/core';

import { GuestbookService } from './guestbook.service';
import { NgForm } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
export interface GuestbookData {

  name: string;
  message: string;

}

/**
 * @title Data table with sorting, pagination, and filtering.
 */

 /**
 * @title Basic use of `<table mat-table>`
 */
@Component({
  selector: 'app-guestbook',
  styleUrls: ['./guestbook.component.css'],
  templateUrl: './guestbook.component.html',
})

export class GuestbookComponent implements OnInit {
  displayedColumns: string[] = ['name','message'];

  dataSource: MatTableDataSource<GuestbookData>;

  name: string;
  message:string;
  
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(private guestbookService:GuestbookService) {
 
  }

  ngOnInit() {
    this.guestbookService.getGuestbook().subscribe(guestbook=>{
      this.dataSource = new MatTableDataSource(guestbook);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })

  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  onSubmit (myform: NgForm) {

    this.guestbookService.postGuestbook({name:this.name,message:this.message}).subscribe(result=>{
      this.guestbookService.getGuestbook().subscribe(guestbook=>{
        this.dataSource = new MatTableDataSource(guestbook);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.name='';
        this.message='';
      })
    })
  }
}


