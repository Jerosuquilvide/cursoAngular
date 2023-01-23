import { Component } from '@angular/core';

// import { Product } from './models/product.model';

import { AuthService } from './services/auth.service';
import { UsersService } from './services/users.service';
import { FilesService } from './services/files.service';
import { fi } from 'date-fns/locale';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  imgParent = '';
  showImg = true;
  token = "";
  ImgSrc = "";
  constructor(
    private authService : AuthService,
    private userService : UsersService,
    private fileService : FilesService
  ){

  }


  onLoaded(img: string) {
    console.log('log padre', img);
  }

  toggleImg() {
    this.showImg = !this.showImg;
  }

  createUser(){
    this.userService.create({
      name : 'Jero',
      email : 'jero@email.com',
      password : '123123'
    }).subscribe(rta =>{
      console.log(rta);
    })
  }

  login(){
    this.authService.login('jero@email.com','123123')
    .subscribe(rta => {
      this.token = rta.access_token;
      console.log(rta);
    })
  }

  getProfile(){
    this.authService.profile()
    .subscribe(profile => {
      console.log(profile);
    })
  }

  downloadPdf(){
    this.fileService.getFile('name.pdf','your_url.com','apllication/pdf')
    .subscribe()
  }

  uploadFile(event: Event){
    const element = event.target as HTMLInputElement;
    const file = element.files?.item(0)
    if(file){
      this.fileService.uploadFile(file)
      .subscribe(rta =>{
        this.ImgSrc = rta.location;
      })
    }
  }
}
