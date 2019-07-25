import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Product } from './product';
import { ProductService } from './product.service';
import { CartServiceService } from '../cart/cart-service.service';

@Component({
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  pageTitle = 'Product Detail';
  errorMessage = '';
  product: Product | undefined;
  selectedQuantity:number=1;
  currentStock:number;

  addToCart():void{
    if(this.cartService.addToCart(this.product,+this.selectedQuantity)){
      this.currentStock = this.currentStock - this.selectedQuantity;
      if(this.currentStock<0){
        this.currentStock=0;
      }
    }
    
  }

  constructor(private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private cartService:CartServiceService) {
  }

  ngOnInit() {
    const param = this.route.snapshot.paramMap.get('id');
    if (param) {
      const id = +param;
      this.getProduct(id); 
      this.getCurrentStock(id);     
    }
  }

  getProduct(id: number) {
    this.productService.getProduct(id).subscribe(
      product => {this.product = product;
     },
      error => this.errorMessage = <any>error);
      
  }

  getCurrentStock(id: number) {
    this.cartService.getCurrentStock(id).subscribe(
      stock => {this.currentStock = stock;
     
     },
      error => this.errorMessage = <any>error);
    
  }

  onBack(): void {
    this.router.navigate(['/products']);
  }

}
