
export class ContactModel {
    _id?: string;
    name: string;
    phone: string;
    address: string;
    email: string;
    job: string;
    birthdate: string;
    landline: string;

    constructor(name: string, phone: string, address: string, email: string, job: string, birthdate: string, landline: string){
        this.name = name;
        this.phone = phone;
        this.address = address;
        this.email = email;
        this.job = job;
        this.birthdate = birthdate;
        this.landline = landline;
    }
}