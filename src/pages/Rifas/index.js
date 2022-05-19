import { useState, useEffect } from 'react'
import { useAuth } from '../../context/auth'

import ListRifas from '../../Components/ListRifas';
import SalesRifaModal from '../../Components/SalesRifasModal';

import { sales } from '../../Models/Rifa'
import BackButton from '../../Components/BackButton';

function Rifas() {

	useEffect(() => {
		const statusSalesRifa = localStorage.getItem('@App:user');
		if(JSON.parse(statusSalesRifa).status === 'processing'){
			const dataStorage = localStorage.getItem('@App:dataProcess');
			setRifaModal(JSON.parse(dataStorage))
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	},[])

	const [ openModal, setOpenModal ] = useState(false)
	const [ rifa, setRifa ] = useState({})

  const { rifas, user } = useAuth();

	
	const setRifaModal = (data) => {

		const rif = ascRifas(rifas).filter( r => r.id === data.id)[0]

		if(rif.status === 'sold') {
			user.status = 'available'
			localStorage.setItem('@App:user', JSON.stringify(user));
			return
		}

		console.log(user.email)

		sales({ ...data, salesman: user.email, status: 'processing' })
		user.status = 'processing'
		localStorage.setItem('@App:user', JSON.stringify(user));
		localStorage.setItem('@App:dataProcess', JSON.stringify({ ...data, salesman: user.email, status: 'processing' }));
		setRifa(data)
		setOpenModal(!openModal)
  }

  const ascRifas = (rifasAsc) => {

		const ArrayRifas = Object.keys(rifasAsc).map( key => ({ ...rifasAsc[key], id: key }))
	
		return ArrayRifas.sort((a, b) => a.number - b.number)
	}

  

	const salesRifa = (data) => {
		sales(data)
		closeModal(null, true)
	}

	const closeModal = (data, isSales = false) => {
		console.log(data)
		user.status = 'available'
		localStorage.setItem('@App:user', JSON.stringify(user));
		localStorage.setItem('@App:dataProcess', JSON.stringify({ ...data, status: 'available' }));
		if(!isSales){
			sales({ ...data, status: 'available' })
			setOpenModal(!openModal)
		}else{
			setOpenModal(!openModal)
		}
		
	}

	const isRifasObjetcEmpty = (obj) => {
	
		if(obj === null){
			obj = {}
		}

		if(Object.values(obj).length === 0){
			return <h1 style={{color: '#fff'}}> Não foram Gerados numeros </h1>
		}else {
			if(!!Object.keys(rifas).length){
				return <ListRifas rifas={ascRifas(rifas)} setRifaModal={setRifaModal} />
			}else{
				return <h1 style={{color: '#fff'}}>Carregando...</h1>
			}
		}
	}

	

 return (
    <>
			
			{ openModal ? <SalesRifaModal rifa={rifa} closeModal={closeModal} salesRifa={salesRifa} /> : '' }
			<BackButton />
			{isRifasObjetcEmpty(rifas)}
    </>    
  );
}

export default Rifas;
