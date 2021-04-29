import { Component, OnInit } from '@angular/core';
import { User, UserResponse } from '@app/shared/components/models/user.interface';
import { AuthService } from '../auth.service';
import{FormBuilder} from '@angular/forms';
import { Router } from '@angular/router';
import { HeaderComponent } from '@app/shared/components/header/header.component';
import { MatDialog } from '@angular/material/dialog';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import{AlertasService} from '../../home/Services/alertas/alertas.service'
import { from } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm = this.fb.group({
    cedula:[''],
    password:[''],
  });
  errorStatus= false;
  msj="";
  constructor(private authSvc:AuthService, private fb:FormBuilder,
    private router:Router,public dialog:MatDialog) { }
  ngOnInit(): void {
    this.checkToken();
  }
  checkToken(){
    if(localStorage.getItem('token')){
      this,this.router.navigate(['home']);
    }
  }
  onLogin():void{
    if(this.loginForm.invalid){

      return;
    }
    const formValue=this.loginForm.value;
    let cacheUser:User=formValue;
    this.authSvc.login(formValue).subscribe(data=>{
      let dataResponse:UserResponse=data;
      console.log(dataResponse)
      if(dataResponse.succeeded==false){
        this.errorStatus=true;
        console.log(dataResponse.message);
        this.msj=dataResponse.message;
      }else if(dataResponse.succeeded==true && dataResponse.statusCode===401){
        localStorage.setItem('token',data.result.token);
        localStorage.setItem('cedula',cacheUser.cedula);
        localStorage.setItem('password',cacheUser.password);
        this.router.navigate(['register'])
      }
      else if(dataResponse.succeeded==true && dataResponse.statusCode===200){
        localStorage.setItem('token',data.result.token);
        this.router.navigate(['home']);
      }
    })
 }
   openModal(){
      this.dialog.open(ResetpasswordComponent);
  }
}
