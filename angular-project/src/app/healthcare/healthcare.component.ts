import { Component } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SellerService } from '../sellerservice/seller.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CartComponent } from '../cart/cart.component';


import { FormsModule, NgForm } from '@angular/forms';  // Import NgForm

import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-healthcare',
  standalone: true,
  imports: [NgbModule, CommonModule, CartComponent,FormsModule, HttpClientModule],
  templateUrl: './healthcare.component.html',
  styleUrl: './healthcare.component.css'
})
export class HealthcareComponent {


  healthcareTakers: any[] = [];

  constructor(private seller: SellerService, private router: Router) {}


  ngOnInit(): void {
    this.getHealthcareTakers();
  }

  getHealthcareTakers(): void {
    this.seller.getHealthcareTakers().subscribe(
      (res: any) => {
        this.healthcareTakers = res;
        console.log('Healthcare takers fetched successfully:', this.healthcareTakers);
      },
      (error: any) => console.error('Error fetching healthcare takers:', error)
    );
  }

}
