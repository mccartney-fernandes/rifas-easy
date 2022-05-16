import app from '../services/firebaseConfig'
import { getDatabase, ref, push, update, child, get } from 'firebase/database'

const db = getDatabase(app)

export async function sales(data) {	
    await update(ref(db, `rifas/${data.id}`), { 
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
            await push(ref(db, 'rifas'), 
                            { number: i, buyer: '', phone: '', salesman: '', status: 'available'}
                        )
        }

        return { data: `Foram geradas de ${initial} a ${final} de Rifas.`, status: 200 }
    } catch (error) {
        return { data: 'error', status: 400 }
    }
}

export async function getReportRifas(args, level, email) {
	
	const dbRef = ref(db)
	let report = await get(child(dbRef, `rifas`))

	const ArrayRifas = Object.keys(report.val()).map( key => ({ ...report.val()[key], id: key }))

	
	if(args === 'sold'){
		if(level === 'adm') {
			console.log(args, level, email)
			return ArrayRifas.sort((a, b) => a.number - b.number).filter( fic => fic.status === 'sold')
		}

		if(level === 'cli')	{
			const reps = ArrayRifas.sort((a, b) => a.number - b.number)
												.filter( fic => fic.status === 'sold')
												.filter( fi => fi.salesman === email)
			return reps
		}			
			
	}		

	if(args === 'available'){		
		if(level === 'adm') {
			return {
				available: ArrayRifas.sort((a, b) => a.number - b.number).filter( fic => fic.status === 'available').length,
				sold: ArrayRifas.sort((a, b) => a.number - b.number).filter( fic => fic.status === 'sold').length
			}
		}

		if(level === 'cli') {
			return {
				available: ArrayRifas.sort((a, b) => a.number - b.number).filter( fic => fic.status === 'available').length,
				sold: ArrayRifas.sort((a, b) => a.number - b.number).filter( fic => fic.status === 'sold').filter( fi => fi.salesman === email ).length
			}
		}
	}
}
