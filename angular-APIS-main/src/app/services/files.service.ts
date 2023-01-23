import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { saveAs } from 'file-saver';
import { environment } from 'src/environments/environment';
import { tap,map } from 'rxjs/operators';

interface File{
  originalname: string;
  filename: string;
  location: string;
}

@Injectable({
  providedIn: 'root'
})


export class FilesService {

  private apiUrl = `${environment.API_URL}/api/files`;

  constructor(
    private htpp : HttpClient
  ) { }

  getFile(name: string, url: string, type: string ){
    return this.htpp.get(url, {responseType: 'blob'})
    .pipe(
      tap( content => {
        const blob = new Blob([content],{type});
        saveAs(blob,name);
      }),
      map(() => true)
    )
  }

  uploadFile(file : Blob){
    const dto = new FormData();
    dto.append('file',file);
    return this.htpp.post<File>(`${this.apiUrl}/upload`,dto,{
      // headers:{
      //   'Content-type':"multipart/form-data"
      // }
    })
  }
}
 