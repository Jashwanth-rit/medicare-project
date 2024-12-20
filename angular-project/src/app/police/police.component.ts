import { Component } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SellerService } from '../sellerservice/seller.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CartComponent } from '../cart/cart.component';


import { FormsModule, NgForm } from '@angular/forms';  // Import NgForm

import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-police',
  standalone: true,
  imports: [NgbModule, CommonModule, CartComponent,FormsModule, HttpClientModule],
  templateUrl: './police.component.html',
  styleUrl: './police.component.css'
})
export class PoliceComponent {


  policeServices: any[] = [];

  constructor(private seller: SellerService, private router: Router) {}

  ngOnInit(): void {
    this.getPoliceServices();
  }

  getPoliceServices(): void {
    this.seller.getPoliceServices().subscribe(
      (res: any) => {
        this.policeServices = res;
        console.log('Police services fetched successfully:', this.policeServices);
      },
      (error: any) => console.error('Error fetching police services:', error)
    );
  }

}
