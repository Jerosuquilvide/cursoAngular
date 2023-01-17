import { Component, OnInit } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { zip } from 'rxjs';
import { Product, CreateProductDTO, UpdateProductDTO } from '../../models/product.model';

import { StoreService } from '../../services/store.service';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  myShoppingCart: Product[] = [];
  total = 0;
  products: Product[] = [];
  showProductDetail = false;
  statusDetail: 'loading' | 'succes' | 'error' | 'init' = 'init';
  productChosen : Product ={
    id : '',
    price : 0,
    images: [],
    title: '',
    category: {
      id:'',
      name:''
    },
    description: ''
  };
  constructor(
    private storeService: StoreService,
    private productsService: ProductsService
  ) {
    this.myShoppingCart = this.storeService.getShoppingCart();
  }

  ngOnInit(): void {
    this.loadMore();
  }

  onAddToShoppingCart(product: Product) {
    this.storeService.addProduct(product);
    this.total = this.storeService.getTotal();
  }

  toggleButtonDetail(){
    this.showProductDetail = !this.showProductDetail;
  }

  viewDetails(id: string){
      this.statusDetail = 'loading';
      this.toggleButtonDetail();
     this.productsService.getProduct(id)
     .subscribe(data =>{
      this.productChosen = data;
      this.statusDetail = 'succes';
     }, response => {
      console.log(response.error.message);
      this.statusDetail = 'error';
     })
  }

  createProduct(){
    const product : CreateProductDTO = {
      title: 'Nueo producto',
      description: 'bla bla bla ',
      images: [`https://placeimg.com/640/480/any?random=${Math.random()}`],
      price: 1000,
      categoryId: 1
    }
    this.productsService.create(product)
    .subscribe(data => {
      this.products.unshift(data);
    });
    
  }

  updateProduct(){
    const changes : UpdateProductDTO = {
      title : 'New title'
    }
    const id = this.productChosen.id;
    this.productsService.update(id,changes)
    .subscribe(data => {
      const productIndex = this.products.findIndex(item => item.id === this.productChosen.id);
      this.products[productIndex] = data;
      this.productChosen = data;
    })
  }

  deleteProduct(){
    const id = this.productChosen.id;
    this.productsService.delete(id)
    .subscribe(() => {
      const productIndex = this.products.findIndex(item => item.id === this.productChosen.id);
      this.products.splice(productIndex,1);
      this.showProductDetail = false;
    })
  }

  limit = 10;
  offset = 0;

  loadMore(){
    this.productsService.getAllProducts(this.limit,this.offset)
    .subscribe(data => {
      this.products = this.products.concat(data);
      this.offset += this.limit;
    });
  }

  readAndUpdate(id: string){
    this.productsService.getProduct(id)
    .pipe(
      switchMap((product) => this.productsService.update(product.id, {title : 'change'}))
    )
    .subscribe(data =>{
      console.log(data);
    });
    this.productsService.fetchReadAndUpdate(id,{title : 'new'})
    .subscribe( response => {
        const read = response[0]; 
        const update = response[1]; 
    }
    )
  }
}
