import { Component } from '@angular/core';
import { ProductService } from '../product.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

interface Product {
  id: string;
  name: string;
  price: number;
}

@Component({
  selector: 'app-product-add',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './product-add.component.html',
  styleUrl: './product-add.component.css'
})
export class ProductAddComponent {
  product: Product = { id: '', name: '', price: 0 };
  lastId: number = 0;

  constructor(private productService: ProductService, private router: Router) {
    this.productService.getProducts().subscribe((products: Product[]) => {
      this.lastId = Math.max(...products.map(product => Number(product.id)));
    });
  }

  addProduct(): void {
    this.product.id = (this.lastId + 1).toString();
    this.productService.addProduct(this.product).subscribe((newProduct: Product) => {
      this.router.navigate(['/product-list']);
    });
  }
}