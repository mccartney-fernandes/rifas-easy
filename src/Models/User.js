import app from '../services/firebaseConfig'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { getDatabase, ref, child, get } from "firebase/database";

const auth = getAuth(app)

const dbRealTime = getDatabase(app)

export async function Authenticate({ email, password }) {
   try {

    const user = await signInWithEmailAndPassword(auth, email, password)
    return { data: user.user, status: 200 }

   } catch (error) {

    return { data: error.code, status: 400 }

   }
    
}

export async function userLevel(userId) {
	const dbRef = ref(dbRealTime)

	const response = await get(child(dbRef, `adm/${userId}`))
	
	if(!response.exists())
		return { data: 'redirect', status: 400 } 
	
	return { data: 'adminstrator', status: 200 }
	 
}
