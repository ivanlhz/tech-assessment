export interface User {
  id: string;
  fullName: string;
  username: string;
  email: string;
  phone: string;
  status: 'active' | 'inactive';
}
