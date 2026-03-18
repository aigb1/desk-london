
import React, { useEffect } from 'react';
import { User, Role } from '../types';

interface Props {
  user: User | null;
  onRedirect: (view: 'guest-dashboard' | 'supplier-dashboard') => void;
}

const RedirectHandler: React.FC<Props> = ({ user, onRedirect }) => {
  useEffect(() => {
    if (user) {
      if (user.role === 'SUPPLIER') {
        onRedirect('supplier-dashboard');
      } else {
        onRedirect('guest-dashboard');
      }
    }
  }, [user, onRedirect]);

  return null; // Logic-only component
};

export default RedirectHandler;
