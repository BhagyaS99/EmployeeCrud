import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiserviceService } from '../apiservice.service';
import { FormControl, FormGroup, MinValidator, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {


  errMsg:any;
  successMsg:any;
  getparamid:any;

  employeeForm = new FormGroup({
    'FirstName':new FormControl('',[Validators.required, Validators.minLength(2), Validators.maxLength(100)]),
    'LastName':new FormControl('',[Validators.required,Validators.minLength(1), Validators.maxLength(100)]),
    'Des':new FormControl('',[Validators.required,Validators.minLength(2), Validators.maxLength(100)]),
    'Salary':new FormControl('',[Validators.required,Validators.pattern('^[0-9]+')])
  })

  constructor(private api:ApiserviceService, private router:ActivatedRoute){}

  ngOnInit(): void {
    this.getparamid = this.router.snapshot.paramMap.get('id');
    if(this.getparamid){
   this.api.getSingleData(this.getparamid).subscribe((res)=>{
      console.log(res,'Selected update data');
      console.log(res.data.FirstName,'firstname')

      this.employeeForm.patchValue({
        FirstName:res.data.FirstName,
        LastName:res.data.LastName,
        Des:res.data.Des,
        Salary:res.data.Salary
      })
    })
  }
  }

get FirstName(){return this.employeeForm.get('FirstName')}
get LastName(){return this.employeeForm.get('LastName')}
get Des(){return this.employeeForm.get('Des')}
get Salary(){return this.employeeForm.get('Salary')}

  employeeSubmit(){
   // console.log(this.employeeForm.value);
   if(this.employeeForm.valid){
    console.log(this.employeeForm.value);
    this.api.createData(this.employeeForm.value).subscribe((res)=>{
      console.log(res, 'Data added')
      this.employeeForm.reset();
     this.successMsg = "New employee added successfully!!"
    })
   }
   else{
    this.errMsg='Please enter all the values!!';
    console.log(this.errMsg);
   }
  }

  updateEmployee(){
   // console.log(this.employeeForm.value);
   if(this.employeeForm.valid){
    this.api.updateData(this.employeeForm.value,this.getparamid).subscribe((res)=>{
      console.log(res,'Data updated successfully');
     this.successMsg = "Changes were successfully made!!"
    })
   }
   else{
    this.errMsg='All Fields are required.';
   }
  }

}
