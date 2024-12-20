import { Component } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SellerService } from '../sellerservice/seller.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CartComponent } from '../cart/cart.component';


import { FormsModule, NgForm } from '@angular/forms';  // Import NgForm

import { HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-ambulance',
  standalone: true,
  imports: [NgbModule, CommonModule, CartComponent,FormsModule, HttpClientModule],
  templateUrl: './ambulance.component.html',
  styleUrl: './ambulance.component.css'
})
export class AmbulanceComponent {

  ambulances: any[] = []; // Array to hold ambulance data

  constructor(private seller: SellerService, private router: Router) {}

  ngOnInit(): void {
    this.getAmbulances();
  }

  getAmbulances(): void {
    this.seller.getAmbulances().subscribe(
      (res: any) => {
        this.ambulances = res;
        console.log('Ambulances fetched successfully:', this.ambulances);
      },
      (error: any) => console.error('Error fetching ambulances:', error)
    );
  }

}
