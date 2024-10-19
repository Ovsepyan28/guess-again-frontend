import { useEffect, useState } from 'react';
import axios from 'axios';

import { User } from '@/types/user';

export const useWhoami = () => {
  const [user, setUser] = useState<User | null>(null);

  const fetchUser = async () => {
    try {
      const response = await axios.get('/api/auth/whoami', {
        withCredentials: true,
      });

      setUser(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return { user };
};
