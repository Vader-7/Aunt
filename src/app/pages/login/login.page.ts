import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { User } from '../../interface/user';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  registrado: any [] = [];

  usuario:User={
    name:'',
    lastname:'',
    email:'',
    password:''
  }
  constructor(private storage:Storage, private router:Router,
    private menuCtrl: MenuController) {
   }  

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }
  
  onSubmit()
  {
    console.log(this.usuario.name);
    this.logear();
  }

  async logear()
  {
    await this.storage.get('users').then((val) => {
      if(val instanceof Array){
      for(let i=0; i<val.length; i++){
      {
        if(val[i].email == this.usuario.name && val[i].password == this.usuario.password)
        {
          this.storage.set('auth', true);
          this.router.navigate(['/main']);
        }
        else{
          this.storage.set('auth', false);
          console.log("El usuario no existe");
        }
      }
    }
  }else{
    console.log("El usuario no existe");
  }
    });
  }
}
