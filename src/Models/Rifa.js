import app from '../services/firebaseConfig'
// import { getFirestore, collection, getDocs, addDoc } from 'firebase/firestore'
import { getDatabase, ref, push, update } from 'firebase/database'

// const db = getFirestore(app);
const dbRealTime = getDatabase(app)


// export async function index() {
//     const citySnapshot = await getDocs(collection(db, 'rifas'))
//     const rifasList = citySnapshot.docs.map(doc => {
// 												console.log(doc.id)
// 												return doc.data()									
// 											})
//     return rifasList
// }

export async function sales(data) {	
    await update(ref(dbRealTime, `rifas/${data.id}`), { 
			number: data.number, 
			buyer: data.buyer,
			phone: data.phone, 
			salesman: data.salesman, 
			status: data.status
		 })
}

export async function generateRifa({ initial, final }) {   
    try {
        for(let i=parseInt(initial);i<=parseInt(final);i++){
            await push(ref(dbRealTime, 'rifas'), 
                            { number: i, buyer: '', phone: '', salesman: '', status: 'available'}
                        )
        }

        return { data: `Foram geradas de ${initial} a ${final} de Rifas.`, status: 200 }
    } catch (error) {
        return { data: 'error', status: 400 }
    }
}

// export async function generateRifa({ initial, final }) {
   
// 	try {
// 			for(let i=parseInt(initial);i<=parseInt(final);i++){
// 					await addDoc(collection(db, 'rifas'), 
// 													{ number: i, buyer: '', salesman: '', status: false}
// 											)
// 			}

// 			return { data: `Foram geradas de ${initial} a ${final} de Rifas.`, status: 200 }
// 	} catch (error) {
// 			return { data: 'error', status: 400 }
// 	}
// }
