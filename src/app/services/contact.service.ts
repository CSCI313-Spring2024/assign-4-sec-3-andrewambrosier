import { Injectable } from '@angular/core';
import { Contact } from '../models/contact.model';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private contacts: Contact[] = [];
  private nextId = 1;

  getContacts(): Contact[] {
    return this.contacts;
  }

  addContact(contact: Contact) {
    contact.id = this.nextId++;
    this.contacts.push(contact);
  }

  updateContact(updatedContact: Contact) {
    const index = this.contacts.findIndex(c => c.id === updatedContact.id);
    if (index !== -1) this.contacts[index] = updatedContact;
  }

  deleteContact(id: number) {
    this.contacts = this.contacts.filter(c => c.id !== id);
  }

  getContactById(id: number): Contact | undefined {
    return this.contacts.find(c => c.id === id);
  }
}
