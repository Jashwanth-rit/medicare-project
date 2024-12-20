import { Component } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SellerService } from '../sellerservice/seller.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CartComponent } from '../cart/cart.component';


import { FormsModule, NgForm } from '@angular/forms';  // Import NgForm

import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-donate',
  standalone: true,
  imports: [NgbModule, CommonModule, CartComponent,FormsModule, HttpClientModule],
  templateUrl: './donate.component.html',
  styleUrl: './donate.component.css'
})
export class DonateComponent {

  constructor(private seller: SellerService, private router: Router) {}

  patients: any[] = [];

  ngOnInit(): void {
    this.getDonations();
  }


  getDonations(): void {
    this.seller.getDonations().subscribe(
      (res: any) => {
        this.patients = res;
        console.log('Donations fetched successfully:', this.patients);
      },
      (error:any) => console.error('Error fetching donations:', error)
    );
  }

  donate(patientId: string) {
    // Handle donation logic
    console.log(`Donation made to patient with ID: ${patientId}`);
    // You might want to make an API call here to process the donation
  }
  

}
