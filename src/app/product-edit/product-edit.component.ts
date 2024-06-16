import { Component, Inject } from '@angular/core';
import { ProductService } from '../product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

interface Product {
  id: string;
  name: string;
  price: number;
}

@Component({
  selector: 'app-product-edit',
  standalone: true,
  providers: [ProductService],
  imports: [FormsModule],
  templateUrl: './product-edit.component.html',
  styleUrl: './product-edit.component.css'
})
export class ProductEditComponent {

  product: Product = { id: '', name: '', price: 0 };

  constructor(
    private productService: ProductService,
    @Inject(ActivatedRoute) private route: ActivatedRoute,
    @Inject(Router) private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.productService.getProduct(id).subscribe((data: Product) => {
        this.product = data;
      });
    }
  }

  updateProduct() {
    this.productService.updateProduct(this.product).subscribe(
      
      response => {
        this.router.navigate(['/product-list']);
        // handle successful update
        console.log('Product updated successfully', response);
      },
      error => {
        // handle error
        console.log('Error updating product', error);
      }
      
    );
  }
}