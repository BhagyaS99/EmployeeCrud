import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiserviceService } from '../apiservice.service';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-read',
  templateUrl: './read.component.html',
  styleUrls: ['./read.component.css']
})
export class ReadComponent implements OnInit{

  constructor(private api:ApiserviceService){}

  errorMsg:string = '';
  readEmp:any;
  successMsg:string ='';
  ngOnInit():void{
    this.getAlldata();

  }

  getAlldata(){
    this.api.getAllUser().subscribe((res)=>{
      console.log('Get All Data',res);
      this.readEmp=res;
      console.log(this.readEmp);
    },(error)=>{
     // console.log(error);
     this.errorMsg=error;
    })
  }

  deleteId(id:any){
    console.log(id,"selected ID");
    this.api.deleteData(id).subscribe((res)=>{
      console.log(res,"deleted");
     this.successMsg = "Deleted Successfully!"
      this.getAlldata();
    })
  }

}
