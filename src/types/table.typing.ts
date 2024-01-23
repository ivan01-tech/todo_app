export type Table = 'Contacts' | 'UserPreferences';
export type Contact = {
  firstName: string;
  name: string;
  id?: string;
  phoneNumber: number;
};

export type Todo = {
  title: string;
  description: string;
  id?: number;
  completed: 0|1;
};
