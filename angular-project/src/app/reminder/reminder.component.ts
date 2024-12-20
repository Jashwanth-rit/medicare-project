import { Component } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SellerService } from '../sellerservice/seller.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CartComponent } from '../cart/cart.component';


import { FormsModule, NgForm } from '@angular/forms';  // Import NgForm

import { HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-reminder',
  standalone: true,
  imports: [NgbModule, CommonModule, CartComponent,FormsModule, HttpClientModule],
  templateUrl: './reminder.component.html',
  styleUrl: './reminder.component.css'
})
export class ReminderComponent {
  reminders: any[] = []; // Store all reminders
  beforeTabletReminders: any[] = []; // Reminders for "before taking tablets"
  afterTabletReminders: any[] = []; // Reminders for "after taking tablets"

  constructor(private seller: SellerService, private router: Router) {}



 
  showAddForm = false; // Toggle state for the form
  newReminder: any = {
    name: '',
    time: '',
    before: 0,
    after: 0,
    numberOfTablets: 1,
    tabletList: '',
  };

 
  ngOnInit(): void {
    this.getReminders();
  }

  toggleAddForm() {
    this.showAddForm = !this.showAddForm;
  }

  removeReminder(id: string) {
    console.log('Removing reminder with ID:', id);
    this.seller.deleteReminder(id).subscribe(() => {
      this.getReminders();
    });
  }

  getReminders() {
    this.seller.getReminders().subscribe(
      (res: any) => {
        this.reminders = res;
        this.beforeTabletReminders = this.reminders.filter((r) => r.before > 0);
        this.afterTabletReminders = this.reminders.filter((r) => r.after > 0);
      },
      (error) => console.error('Error fetching reminders:', error)
    );
  }

  addReminder() {
    const reminderData = {
      ...this.newReminder,
      tabletList: this.newReminder.tabletList.split(',').map((t:any) => t.trim()),
    };

    this.seller.addReminder(reminderData).subscribe(
      (res:any) => {
        console.log('Reminder added successfully:', res);
        this.getReminders();
        this.toggleAddForm(); // Close form
        this.newReminder = { name: '', time: '', before: 0, after: 0, numberOfTablets: 1, tabletList: '' }; // Reset form
      },
      (error:any) => console.error('Error adding reminder:', error)
    );
  }
}
