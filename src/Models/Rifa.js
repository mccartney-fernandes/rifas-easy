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

const agruparPor = (array, propriedade) => {
  return array.reduce((objeto, elementoAtual) => {
    const grupo = elementoAtual[propriedade];
    if (!objeto.hasOwnProperty(grupo)) {
      objeto[grupo] = [];
    }
    objeto[grupo].push(elementoAtual);
    return objeto;
  }, {})
}

export async function getReportRifas(args, level, email, group = null) {
	
	const dbRef = ref(db)
	let report = await get(child(dbRef, `rifas`))

	const ArrayRifas = Object.keys(report.val()).map( key => ({ ...report.val()[key], id: key }))

	if(args === 'sold-salesman'){
		if(level === 'adm') {
			if(group) {
				const salesmanQtd = agruparPor(
																				ArrayRifas.sort((a, b) => a.number - b.number)
																									.filter( fic => fic.status === 'sold'), 
																				'salesman'
																			)
				const objArray = Object.keys(salesmanQtd)
																.map( key => ({ name: key, sales: salesmanQtd[key].length }))
																.sort((a, b) => b.sales - a.sales)

				return objArray
			}
		}		
	}
	
	if(args === 'sold'){
		if(level === 'adm') {			
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
