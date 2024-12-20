import { Component } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SellerService } from '../sellerservice/seller.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CartComponent } from '../cart/cart.component';

@Component({
  selector: 'app-physical',
  standalone: true,
  imports: [NgbModule, CommonModule, CartComponent],
  templateUrl: './physical.component.html',
  styleUrls: ['./physical.component.css'], // Note the correct key name is 'styleUrls'
})
export class PhysicalComponent {
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
          (doctor: any) => doctor.category === 'Physical Treatment'
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

  viewDetails(id: any): void {
    console.log(`Viewing details for doctor with ID: ${id}`);
    // Navigate to the doctor details page with the doctor's ID
   
      this.router.navigate([`doctor-details/${id}`])
  }
}
