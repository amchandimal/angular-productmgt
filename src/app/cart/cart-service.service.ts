import { Injectable, OnInit } from '@angular/core';
import { Product } from '../products/product';
import { ProductService } from '../products/product.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CartServiceService{
  

  constructor(private productService: ProductService) {
  }

  addToCart(product:Product,qty:number):  boolean{
    
   

   this.productService.getProduct(product.productId).subscribe(
     data=> {
   
     let currentcartqty:number = +(localStorage.getItem(product.productId+'')?localStorage.getItem(product.productId+''):0);
    
     if(data.stock<(qty+currentcartqty)){
       alert("Stock Not Enough");
       return false;
     }else{
       
       localStorage.setItem(product.productId+'',((qty+currentcartqty))+''); 
       alert("Stock Updated");      
    }

    
      
  },);

    
    return true;
   
  }

  getCurrentStock(id: number): Observable<number | undefined> {
    let currentcartqty:number = +(localStorage.getItem(id+'')?localStorage.getItem(id+''):0);
    return this.productService.getProducts().pipe(
      map((products: Product[]) => products.find(p => p.productId === id).stock-currentcartqty)
    );
  }


}
