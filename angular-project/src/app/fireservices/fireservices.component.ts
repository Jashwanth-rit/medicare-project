import { Component } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SellerService } from '../sellerservice/seller.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CartComponent } from '../cart/cart.component';


import { FormsModule, NgForm } from '@angular/forms';  // Import NgForm

import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-fireservices',
  standalone: true,
  imports: [NgbModule, CommonModule, CartComponent,FormsModule, HttpClientModule],
  templateUrl: './fireservices.component.html',
  styleUrl: './fireservices.component.css'
})
export class FireservicesComponent {

  fireExtinguishers: any[] = []; // Array to hold fire extinguisher data

  constructor(private seller: SellerService, private router: Router) {}

  ngOnInit(): void {
    this.getFireExtinguishers();
  }

  getFireExtinguishers(): void {
    this.seller.getFireExtinguishers().subscribe(
      (res: any) => {
        this.fireExtinguishers = res;
        console.log('Fire extinguishers fetched successfully:', this.fireExtinguishers);
      },
      (error: any) => {
        console.error('Error fetching fire extinguishers:', error);
      }
    );
  }

}
