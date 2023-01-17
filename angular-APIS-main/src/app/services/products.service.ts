import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { catchError, retry, map } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Product, CreateProductDTO, UpdateProductDTO } from './../models/product.model';

import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private apiUrl = `${environment.API_URL}/api/products`;

  constructor(
    private http: HttpClient
  ) { }

  getAllProducts(limit?:number, offset?:number) {
    let params = new HttpParams();
    if(limit && offset){
      params = params.set('limit',limit);
      params = params.set('offset',offset);
    }
    return this.http.get<Product[]>(this.apiUrl, {params})
    .pipe(
      retry(3),
      map(products => products.map(item => {
        return {
          ...item,
          taxes: .21 * item.price
        }
      }))
    );
  }

  getProduct(id : string){
    return this.http.get<Product>(`${this.apiUrl}/${id}`)
    .pipe(
      catchError((error : HttpErrorResponse) => {
        if(error.status === 500){
          return throwError('Algo esta fallando en el server ');
        }
        if(error.status === 404){
          return throwError('El producto solicitado no existe');
        }
        return throwError('Ups algo salió mal');
      })
    )
  }

  getProductByPage(limit:number, offset:number){
    return this.http.get<Product[]>(`${this.apiUrl}/`, {
      params : {limit, offset}
    })
  }

  create( dto : CreateProductDTO) {
    return this.http.post<Product>(this.apiUrl, dto);  
  }

  update(id:string, dto:UpdateProductDTO){
    return this.http.put<Product>(`${this.apiUrl}/${id}`,dto)
  }

  delete(id : string){
    return this.http.delete<boolean>(`${this.apiUrl}/${id}`)
  }
}
