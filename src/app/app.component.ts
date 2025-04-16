import { Component } from '@angular/core';
import { ContactListComponent } from './contact/contact-list/contact-list.component';
import { ContactFormComponent } from './contact/contact-form/contact-form.component';
import { CommonModule } from '@angular/common';
import { Contact } from './models/contact.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    ContactListComponent,
    ContactFormComponent,
  ],
  templateUrl: './app.component.html',
})
export class AppComponent {
  view: 'list' | 'form' = 'list';
  editingContact: Contact | null = null;

  showForm(contact?: Contact) {
    this.editingContact = contact ?? null;
    this.view = 'form';
  }

  showList() {
    this.view = 'list';
  }

  handleSave(updated: Contact) {
    this.showList();
  }
}
