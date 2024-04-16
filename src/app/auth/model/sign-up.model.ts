export class UserRegistration {
    username: string;
    email: string;
    password: string;
    name: string;
    surname: string;
    smoke: boolean;
    instagram: string;
    description: string;
    work: boolean;
    study: boolean;
    birth: string;
    role: string = 'user';
    image: File;
  
    constructor(
      username: string,
      email: string,
      password: string,
      name: string,
      surname: string,
      smoke: boolean,
      instagram: string,
      description: string,
      work: boolean,
      study: boolean,
      birth: string,
      image: any
    ) {
      this.username = username;
      this.email = email;
      this.password = password;
      this.name = name;
      this.surname = surname;
      this.smoke = smoke;
      this.instagram = instagram;
      this.description = description;
      this.work = work;
      this.study = study;
      this.birth = birth;
      this.image = image; 
      this.role;
    }
  }
  