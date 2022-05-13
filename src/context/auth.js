import { createContext, useState, useEffect, useContext } from 'react';
import app from '../services/firebaseConfig'
import { getDatabase, ref, onValue } from 'firebase/database'

import { Authenticate } from '../Models/User';

const AuthContext = createContext({});

const dbRealTime = getDatabase(app)


export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [rifas, setRifas] = useState({})

  useEffect(() => {
    const storagedUser = localStorage.getItem('@App:user');

    if (storagedUser) {
      setUser(JSON.parse(storagedUser))
			getRifas()
    }
  }, []);

  async function Login(userData) {
    const userAuth = await Authenticate(userData)

    if(userAuth.status === 400)
      return userAuth
    
    setUser({ ...userAuth.data, status: 'available' })
    localStorage.setItem('@App:user', JSON.stringify({ ...userAuth.data, status: 'available' }));
		getRifas()
		
    return userAuth    
  }

async function getRifas() {
	const rifasRef = ref(dbRealTime, 'rifas')
	
	await onValue(rifasRef, async snap => {
		const rifasList = snap.val()
		if(!snap.exists()){
			setRifas({})
		}
			
		
		setRifas(rifasList)
		
	})
}

  function Logout() {
    setUser(null);
    localStorage.removeItem('@App:user')
		localStorage.removeItem('@App:dataProcess')
  }

  return (
    <AuthContext.Provider
      value={{ signed: Boolean(user), user, Login, Logout, rifas }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);

  return context;
}
