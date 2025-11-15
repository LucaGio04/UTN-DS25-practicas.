import { useState, useCallback, useEffect } from 'react';

const API_BASE_URL = 'http://localhost:3000/api';
const TOKEN_KEY = 'jwtToken';
const USER_KEY = 'userData';

export const useAuth = () => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Función para obtener datos del usuario desde el token (decodificando el JWT)
  const getUserFromToken = useCallback((token) => {
    try {
      // Decodificar el JWT sin verificar (solo para obtener el userId)
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(atob(base64).split('').map((c) => {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
      return JSON.parse(jsonPayload);
    } catch (e) {
      console.error('Error decodificando token:', e);
      return null;
    }
  }, []);

  // Listener para cambios en localStorage (útil cuando se hace login en otra pestaña o se actualiza)
  // NOTA: El evento 'storage' solo se dispara en otras pestañas, no en la misma
  useEffect(() => {
    const handleStorageChange = (e) => {
      // Solo procesar cambios de nuestras claves
      if (e.key === TOKEN_KEY || e.key === USER_KEY) {
        const storedToken = localStorage.getItem(TOKEN_KEY);
        const storedUser = localStorage.getItem(USER_KEY);
        if (storedToken && storedUser) {
          setToken(storedToken);
          try {
            setUser(JSON.parse(storedUser));
          } catch (e) {
            console.error('Error parsing user from storage event:', e);
          }
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Cargar token y usuario del localStorage al iniciar
  useEffect(() => {
    const loadUserData = async () => {
      try {
        const storedToken = localStorage.getItem(TOKEN_KEY);
        const storedUser = localStorage.getItem(USER_KEY);
        
        if (storedToken) {
          setToken(storedToken);
          
          if (storedUser) {
            try {
              const parsedUser = JSON.parse(storedUser);
              // Cargar el usuario directamente
              setUser(parsedUser);
              
              // Si no tiene nombre, intentar obtenerlo del backend
              if (!parsedUser?.name) {
                const tokenData = getUserFromToken(storedToken);
                if (tokenData && tokenData.userId) {
                  try {
                    const response = await fetch(`${API_BASE_URL}/users/${tokenData.userId}`, {
                      headers: {
                        'Authorization': `Bearer ${storedToken}`
                      }
                    });
                    if (response.ok) {
                      const userData = await response.json();
                      if (userData.success && userData.data && userData.data.name) {
                        const updatedUser = { id: userData.data.id, email: userData.data.email, name: userData.data.name };
                        setUser(updatedUser);
                        localStorage.setItem(USER_KEY, JSON.stringify(updatedUser));
                      }
                    }
                  } catch (e) {
                    console.error('Error obteniendo usuario del backend:', e);
                  }
                }
              }
            } catch (e) {
              console.error('Error parsing stored user data', e);
            }
          } else {
            console.warn('Token encontrado pero no hay datos de usuario en localStorage');
            // Intentar obtener el usuario del backend
            const tokenData = getUserFromToken(storedToken);
            if (tokenData && tokenData.userId) {
              try {
                const response = await fetch(`${API_BASE_URL}/users/${tokenData.userId}`, {
                  headers: {
                    'Authorization': `Bearer ${storedToken}`
                  }
                });
                if (response.ok) {
                  const userData = await response.json();
                  if (userData.success && userData.data) {
                    const user = { id: userData.data.id, email: userData.data.email, name: userData.data.name };
                    setUser(user);
                    localStorage.setItem(USER_KEY, JSON.stringify(user));
                    console.log('Usuario cargado desde el backend:', user);
                  }
                }
              } catch (e) {
                console.error('Error obteniendo usuario del backend:', e);
              }
            }
          }
        }
      } catch (err) {
        console.error('Failed to load token from localStorage', err);
      } finally {
        setLoading(false);
      }
    };

    loadUserData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Solo ejecutar una vez al montar

  const login = useCallback(async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      // Obtener getUserFromToken para usarlo dentro del login
      const tokenData = (token) => {
        try {
          const base64Url = token.split('.')[1];
          const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
          const jsonPayload = decodeURIComponent(atob(base64).split('').map((c) => {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
          }).join(''));
          return JSON.parse(jsonPayload);
        } catch (e) {
          console.error('Error decodificando token:', e);
          return null;
        }
      };
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json().catch(() => ({ 
        success: false,
        error: 'Error al procesar la respuesta del servidor' 
      }));

      // Verificar que la respuesta sea exitosa
      if (!response.ok || !data.success) {
        const errorMessage = data.error || (Array.isArray(data.error) ? data.error.map(e => e.message || e).join(', ') : `Error en el login (${response.status})`);
        throw new Error(errorMessage);
      }

      // Verificar que la respuesta tenga los datos necesarios
      if (!data.token || !data.user) {
        console.error('Respuesta del servidor incompleta:', data);
        throw new Error('Respuesta del servidor incompleta: faltan token o datos de usuario');
      }

      // Verificar que el usuario tenga nombre - si no lo tiene, intentar obtenerlo del backend
      if (!data.user || !data.user.name) {
        console.warn('⚠️ Usuario sin nombre en la respuesta del login. Intentando obtener del backend...');
        console.log('Datos recibidos del backend:', data.user);
        
        // Decodificar el token para obtener el userId
        const decodedToken = (() => {
          try {
            const base64Url = data.token.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const jsonPayload = decodeURIComponent(atob(base64).split('').map((c) => {
              return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            }).join(''));
            return JSON.parse(jsonPayload);
          } catch (e) {
            console.error('Error decodificando token:', e);
            return null;
          }
        })();
        
        // Si tenemos el userId, obtener el usuario completo del backend
        if (decodedToken && decodedToken.userId) {
          try {
            const userResponse = await fetch(`${API_BASE_URL}/users/${decodedToken.userId}`, {
              headers: {
                'Authorization': `Bearer ${data.token}`
              }
            });
            if (userResponse.ok) {
              const userData = await userResponse.json();
              if (userData.success && userData.data && userData.data.name) {
                data.user = { 
                  id: userData.data.id, 
                  email: userData.data.email, 
                  name: userData.data.name 
                };
                console.log('✅ Usuario actualizado con nombre desde el backend:', data.user.name);
              } else {
                console.error('❌ Usuario obtenido del backend pero sin nombre:', userData);
              }
            } else {
              console.error('❌ Error al obtener usuario del backend:', userResponse.status);
            }
          } catch (e) {
            console.error('❌ Error obteniendo usuario completo:', e);
          }
        } else {
          console.error('❌ No se pudo decodificar el token para obtener userId');
        }
      } else {
        console.log('✅ Usuario con nombre recibido del backend:', data.user.name);
      }

      // Guardar en localStorage PRIMERO
      localStorage.setItem(TOKEN_KEY, data.token);
      localStorage.setItem(USER_KEY, JSON.stringify(data.user));
      
      // Actualizar estado INMEDIATAMENTE
      setToken(data.token);
      setUser(data.user);
      
      // Verificar que se guardó correctamente
      const verifyToken = localStorage.getItem(TOKEN_KEY);
      const verifyUserStr = localStorage.getItem(USER_KEY);
      const verifyUser = verifyUserStr ? JSON.parse(verifyUserStr) : null;
      
      console.log('🔐 Login exitoso - Verificación final:', {
        tokenGuardado: !!verifyToken,
        usuarioGuardado: !!verifyUser,
        usuario: verifyUser,
        tieneNombre: !!verifyUser?.name,
        nombre: verifyUser?.name || '❌ NO TIENE NOMBRE',
        email: verifyUser?.email || 'NO TIENE EMAIL'
      });
      
      if (!verifyToken || !verifyUser) {
        throw new Error('Error al guardar datos de autenticación');
      }
      
      // Si después de guardar aún no tiene nombre, mostrar error crítico
      if (!verifyUser?.name) {
        console.error('❌ ERROR CRÍTICO: Usuario guardado sin nombre después de todos los intentos. Datos:', verifyUser);
        console.error('Esto puede indicar que el usuario en la base de datos no tiene el campo name');
      } else {
        console.log('✅ Usuario guardado correctamente con nombre:', verifyUser.name);
      }
      
      return true;
    } catch (err) {
      if (err.message === 'Failed to fetch' || err.message.includes('fetch')) {
        setError('No se pudo conectar con el servidor. Verifica que el backend esté corriendo en http://localhost:3000');
      } else {
        setError(err.message);
      }
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    setToken(null);
    setUser(null);
  }, []);

  // isAuthenticated debe verificar tanto el estado como localStorage para ser más confiable
  const checkIsAuthenticated = useCallback(() => {
    const storedToken = localStorage.getItem(TOKEN_KEY);
    return !!(token || storedToken);
  }, [token]);
  
  const isAuthenticated = checkIsAuthenticated();

  return {
    token,
    user,
    loading,
    error,
    isAuthenticated, // Ya es un valor booleano, no una función
    login,
    logout,
  };
};
