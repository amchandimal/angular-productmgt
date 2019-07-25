import { Component, OnInit } from '@angular/core';
import { Product } from '../products/product';
import { ProductService } from '../products/product.service';

@Component({
  selector: 'pm-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.css']
})
export class CartListComponent implements OnInit {

  constructor(private productService:ProductService) {
    
   }

  ngOnInit() {
    
    this.getAllCartProducts();
  }

  cartProducts:Product[] =[];
   imageWidth = 50;
  imageMargin = 2;

  getAllCartProducts():void{
    this.cartProducts=[];
    //Get All Cart Items from Local Storage

    let keys = Object.keys(localStorage);
   
    for(let n of keys){
        let num = +n;
        
        this.productService.getProduct(num).subscribe(
          prod => {
            prod.stock = +localStorage.getItem(n);
            if(prod.stock>0){
              this.cartProducts.push(prod);
            }
          }
        )
      
    }
  }

  clearCart():void{
    let val= confirm("Are You Sure want to Clear the Cart");
    if(val){
      let keys = Object.keys(localStorage);
   
      for(let n of keys){
          localStorage.setItem(n+'',0+'');
      }
      this.cartProducts = [];
  }
}


}
