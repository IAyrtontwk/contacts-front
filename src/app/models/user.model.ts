
export class UserModel {
    _id?: string;
    name: string;
    pass: string;
    email: string;
    role: string;

    constructor(name: string, pass: string, email: string, role: string){
        this.name = name;
        this.pass = pass;
        this.email = email;
        this.role = role;
    }
}