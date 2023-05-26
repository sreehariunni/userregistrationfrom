import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EmployeeService } from '../services/employee.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-emp-add-edit',
  templateUrl: './emp-add-edit.component.html',
  styleUrls: ['./emp-add-edit.component.scss']
})
export class EmpAddEditComponent  implements OnInit{
  empform: FormGroup


  constructor(private fb: FormBuilder,
    private empService: EmployeeService,
    private dialogRef:MatDialogRef<EmpAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
    ){
    this.empform = this.fb.group({
      id :'',
      name :'',
      email :'',
      dob :'',
      gender :'',
      salary :''
    })
  }

ngOnInit(): void {
  this.empform.patchValue(this.data)
}



  Submit(){
    if(this.empform.valid){
      if(this.data){
        this.empService.updateEmployee(this.data.id,this.empform.value).subscribe({
          next: (val:any)=>{
            alert('Employee updated successfully')
            this.dialogRef.close(true)
          },
          error:(err:any)=>{
            console.error(err)
          }
        })

      }else{
        this.empService.addEmployee(this.empform.value).subscribe({
          next: (val:any)=>{
            alert('Employe  added successfully')
            this.dialogRef.close(true)
          },
          error:(err:any)=>{
            console.error(err)
          }
        })
      }
      // console.log(this.empform.value)
      
    }
  }

}
