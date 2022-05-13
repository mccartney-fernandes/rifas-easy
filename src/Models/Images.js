import app from '../services/firebaseConfig'
import { getFirestore, collection, getDocs } from 'firebase/firestore'

const db = getFirestore(app)

export async function geImage() {
	const imageSnapshot = await getDocs(collection(db, 'images'))
	const imageList = imageSnapshot.docs.map(doc => {
											return doc.data().src									
										})
	
	return imageList
}
