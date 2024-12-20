import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SellerService } from '../sellerservice/seller.service';
import { CommonModule } from '@angular/common';
import { Product } from '../datatype';

@Component({
  selector: 'app-doctor-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './doctor-details.component.html',
  styleUrl: './doctor-details.component.css'
})
export class DoctorDetailsComponent {

  productId: string | null = null;
  doctor:any;
  searchQuery: string  = '';  // Variable to hold search input
  cartlength: any;
  searchResults: any[] = [];
 
  constructor(private route: ActivatedRoute,private seller: SellerService,private router : Router) {}

  ngOnInit(): void {
    this.productId = this.route.snapshot.paramMap.get('id');
    if (this.productId) {
      this.seller.getdoctordet(this.productId).subscribe(
        (res: any) => {
          console.log('Doctor Data:', res);
          this.doctor = res;
        },
        (error) => {
          console.error('Error fetching doctor data:', error);
        }
      );
    }
  }
  

}
