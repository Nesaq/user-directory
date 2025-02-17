export type User = {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
};

export type UserContextType = {
  users: User[];
  selectedUser: User | null;
  searchQuery: string;
  setUsers: (users: User[]) => void;
  setSelectedUser: (user: User | null) => void;
  setSearchQuery: (query: string) => void;
};
