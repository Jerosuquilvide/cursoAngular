import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { StoreService } from 'src/app/services/store.service';
import { ProductsService } from 'src/app/services/products.service';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  today = new Date();
  prueba = 'abccdee';
  constructor(
    private storeService : StoreService,
    private productsService : ProductsService
  ) { 
    this.myShoppingCart = storeService.getMyShoppingCart();
  }

  ngOnInit(): void {
    this.productsService.getAllProducts()
    .subscribe(data => {
      this.products = data;
    })
  }

  myShoppingCart : Product[] = [];
  total = 0;
  products : Product[] = [];

  onAddCart(product : Product){
    // this.myShoppingCart.push(product);
    this.storeService.addProduct(product);
    this.total = this.storeService.getTotal();
  }

}
