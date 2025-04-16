import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Contact } from '../../models/contact.model';
import { ContactService } from '../../services/contact.service';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  imports: [CommonModule, ReactiveFormsModule]
})
export class ContactFormComponent implements OnInit {
  @Input() contact: Contact | null = null;
  @Output() cancel = new EventEmitter<void>();
  @Output() saved = new EventEmitter<void>();

  contactForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private contactService: ContactService
  ) {}

  get editing(): boolean {
    return !!this.contact;
  }

  ngOnInit(): void {
    this.contactForm = this.fb.group({
      firstName: [this.contact?.firstName || ''],
      lastName: [this.contact?.lastName || ''],
      phone: [this.contact?.phone || ''],
      email: [this.contact?.email || '']
    });
  }

  onSubmit() {
    const formValue = this.contactForm.value;

    if (this.contact) {
      const updatedContact: Contact = { id: this.contact.id, ...formValue };
      this.contactService.updateContact(updatedContact);
    } else {
      this.contactService.addContact(formValue);
    }

    this.saved.emit(); // Notify app.component to switch view
  }

  onCancel() {
    this.cancel.emit();
  }
}
