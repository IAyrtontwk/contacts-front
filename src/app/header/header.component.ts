import { Component, OnInit } from '@angular/core';
import { UserModel } from '../models/user.model';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  userAdd: UserModel = {
    name: '',
    pass: '',
    email: '',
    role: '',
  }
  userSession: UserModel = {
    name: '',
    pass: '',
    email: '',
    role: '',
  }
  token: boolean = false;
  constructor(private _userService: UserService) { }

  ngOnInit(): void {
  }

  addUser = () => {
    let newUser = new UserModel(
      this.userAdd.name,
      this.userAdd.pass,
      this.userAdd.email,
      this.userAdd.role
      );
    this._userService.addUser(newUser).subscribe(data => {
      console.log(data);
      this.eraseForm(this.userAdd);
    }, error => {
      console.log(error);
      this.eraseForm(this.userAdd);
    })  
  }

  // LoginSesion
  iniciarSesion = () => {
    this._userService.autenthication(this.userSession).subscribe(data => {
      console.log(data.user);
      this.userSession._id = data.user[0]._id;
      this.userSession.name = data.user[0].name;
      this.userSession.role = data.user[0].role;
      this.token=true;
      console.log(this.userSession);
    })
  }

  deleteUser = (id: any) => {
    if(this.token){
      this._userService.deleteUser(id).subscribe(data => {
        console.log(data)
        console.log('Usuario enviado a eliminar')
        this.cerrarSesion();
      }, error => {
        console.log(error);
      })
    }
  }

  updateUser = () => {
    this._userService.updateUser(this.userSession).subscribe(data => {
    })
  }

  cerrarSesion = () => {
    this.eraseForm(this.userSession);
    this.token=false;
  }

  eraseForm = (user: UserModel) => {
    user._id='';
    user.name='';
    user.pass='';
    user.email='';
    user.role=''; 
  }
}