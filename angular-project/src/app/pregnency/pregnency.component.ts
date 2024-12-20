import { Component } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SellerService } from '../sellerservice/seller.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CartComponent } from '../cart/cart.component';

@Component({
  selector: 'app-pregnency',
  standalone: true,
  imports: [NgbModule,CommonModule,CartComponent],
  templateUrl: './pregnency.component.html',
  styleUrl: './pregnency.component.css'
})
export class PregnencyComponent {
  physicalTreatmentDoctors: any[] = [];
  doctors: any[] = [];

  constructor(private seller: SellerService, private router: Router) {}

  ngOnInit(): void {
    this.getDoctors();
  }

  getDoctors() {
    this.seller.getDoctorSessions().subscribe(
      (res: any) => {
        console.warn('Doctor Sessions:', res);
        this.doctors = res;
        this.physicalTreatmentDoctors = this.doctors.filter(
          (doctor: any) => doctor.category === 'Pregnency'
        );
      },
      (error: any) => {
        console.error('Error fetching doctor sessions', error);
      }
    );
  }

  bookAppointment(doctorId: number): void {
    console.log(`Booking appointment for doctor with ID: ${doctorId}`);
    // Navigate to the appointment booking page with the doctor's ID
  }

  viewDetails(doctorId: number): void {
    console.log(`Viewing details for doctor with ID: ${doctorId}`);
    // Navigate to the doctor details page with the doctor's ID
  }

}
