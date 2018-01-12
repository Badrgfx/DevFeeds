export class User {
    id?: number;
    username?: string;
    name?: string;
    email?: string;
    facebookId?: string;

  constructor(id?: number) {
     this.id = id;
  }

  }