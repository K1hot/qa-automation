export type User = {
  
    id: number;
  name: string;
  email: string;
  phone: string;

  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
  };

  company: {
    name: string;
    catchPhrase: string;
  };
};

export type invalidUsers = [
  {
    username: 'wrong_user',
    password: 'wrong_password'
  },
  {
    username: '',
    password: 'secret_sauce'
  },
  {
    username: 'standard_user',
    password: ''
  }
];