import { useState, useEffect, useCallback } from 'react';
import { useApi } from './useBooks.js'; // Reutilizamos useApi de useBooks.js

const API_BASE_URL = 'http://localhost:3000/api';

export const useUsers = () => {
  const [users, setUsers] = useState([]);
  const { loading, error, fetchData } = useApi();

  const loadUsers = useCallback(async () => {
    try {
      const response = await fetchData(`${API_BASE_URL}/users`);
      if (response.success) {
        setUsers(response.data);
      }
    } catch (err) {
      console.error('Error loading users:', err);
      // El error ya se maneja en useApi, pero podemos añadir más lógica aquí si es necesario
    }
  }, [fetchData]);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  return {
    users,
    loadingUsers: loading,
    errorUsers: error,
    loadUsers,
  };
};
