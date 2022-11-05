import { Component, OnInit } from '@angular/core';
import { ContactModel } from '../models/contact.model';
import { ContactService } from '../services/contact.service';

@Component({
  selector: 'app-contacts-list',
  templateUrl: './contacts-list.component.html',
  styleUrls: ['./contacts-list.component.css']
})
export class ContactsListComponent implements OnInit {
  contactId: number=0;
  contactList: ContactModel[] = [];
  contactInfo: ContactModel={
    name: '',
    phone: '',
    address: '',
    email: '',
    job: '',
    birthdate: '',
    landline: ''
  }
  contactEdit: ContactModel={
    name: '',
    phone: '',
    address: '',
    email: '',
    job: '',
    birthdate: '',
    landline: ''
  }
  
  constructor(
    private _contactService: ContactService
    ) {}

  ngOnInit(): void {
    this.getContacts();
  }

  //Funciones con node

  getContacts() {
    this._contactService.getContacts().subscribe(data => {
      console.log(data);
      this.contactList = data.contacts;
      this.ordenLista(this.contactList);
    }, error => {
      console.log(error);
    });
    
  }

  addContact = () => {
    let newContact = new ContactModel(
      this.contactInfo.name,
      this.contactInfo.phone,
      this.contactInfo.address,
      this.contactInfo.email,
      this.contactInfo.job,
      this.contactInfo.birthdate,
      this.contactInfo.landline);
      console.log(newContact);
    this._contactService.addContact(newContact).subscribe(data => {
      console.log(data);
      this.getContacts();
      this.eraseForm(this.contactInfo);
    }, error => {
      console.log(error);
      this.eraseForm(this.contactInfo);
    })  
  }

  deleteContact(id: any) {
    this._contactService.deleteContact(id).subscribe(data => {
      console.log(data)
      console.log('Contacto enviado a eliminar')
      this.getContacts();
    }, error => {
      console.log(error);
    })
  }

  editContact = (id: any) => {
        this._contactService.getContactById(id).subscribe(data => {
        console.log(data);
        this.contactEdit = data.contact;
      });
  }

  updateContact = () => {
    this._contactService.updateContact(this.contactEdit).subscribe(data =>{
      this.getContacts();
    }, error => {
      console.log(error);
    })
  }
  
  //  Funciones angular sin node 

  addContact1 = () =>{
    this.contactList.push(
      new ContactModel(
        this.contactInfo.name,
        this.contactInfo.phone,
        this.contactInfo.address,
        this.contactInfo.email,
        this.contactInfo.job,
        this.contactInfo.birthdate,
        this.contactInfo.landline)
    );   
    console.log(this.contactList);
    console.log('Contacto ' + this.contactInfo._id +' Guardado');
    this.eraseForm(this.contactInfo);
    this.ordenLista(this.contactList)
  }

  deleteContact1 = (id: number) => {
    this.contactList.splice(id,1);
    console.log('Contacto eliminado');
    console.log(id);
    console.log(this.contactList);
  }

  saveChangeContact = () => {
    this.contactList[this.contactId] = this.contactEdit;
    console.log('Contacto Modificado');
    console.log(this.contactEdit);
  }
  

  eraseForm = (contact: ContactModel) => {
    contact._id='';
    contact.name='';
    contact.phone='';
    contact.address='';
    contact.email='';
    contact.job='';
    contact.birthdate='';
    contact.landline='';    
  }

  saveBuild = () => {
    sessionStorage.setItem("contactList", JSON.stringify(this.contactList));
    let getContacts = sessionStorage.getItem("contactList");
    console.log(getContacts);
    console.log('sesion de contactos guardada');
  }

  ordenLista = (lista: ContactModel[]) => {
    lista.sort(function (a,b) {
      if(a.name >b.name){
        return 1;
      }else if(a.name < b.name){
        return -1;
      }else{
        return 0;
      }
    })
  }
}
