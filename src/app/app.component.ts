import { Component, OnInit,ViewChild } from '@angular/core';
import{MatDialog} from '@angular/material/dialog'

import { EmpAddEditComponent } from './emp-add-edit/emp-add-edit.component';
import { EmployeeService } from './services/employee.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title(title: any) {
    throw new Error('Method not implemented.');
  }
  
  displayedColumns: string[] = ['id',
   'name',
    'email',
     'dob',
     'gender',
     'salary',
    'action'
  ];


  dataSource!: MatTableDataSource <any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;





constructor (private dialog : MatDialog,private empService:EmployeeService){}


ngOnInit(): void {
  this.getEmployeeList()
}


openAddEditEmpform(){
 const dialogRef= this.dialog.open(EmpAddEditComponent);
 dialogRef.afterClosed().subscribe({
  next: (val)=>{
    if(val){
      this.getEmployeeList()
    }
  }
 })
}

getEmployeeList(){
  this.empService.getEmployeeList().subscribe({
    next:(res)=>{
      // console.log(res)
      this.dataSource= new MatTableDataSource(res)
      this.dataSource.sort=this.sort
      this.dataSource.paginator=this.paginator

    },

error:console.log,

  })
}




applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();

  if (this.dataSource.paginator) {
    this.dataSource.paginator.firstPage();
  }
}



deleteEmployee(id:number){
  this.empService.deleteEmployee(id).subscribe({
    next:(res)=>{
alert('Employee deleted')
this.getEmployeeList()
    },
    error:console.log
  })
}





openEditform(data:any){
   const dialogRef=this.dialog.open(EmpAddEditComponent,{
    data,
   });



   dialogRef.afterClosed().subscribe({
    next: (val)=>{
      if(val){
        this.getEmployeeList()
      }
    }
   })
  
 }


}
