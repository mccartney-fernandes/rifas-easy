import { useState, useCallback, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import BackButton from '../../Components/BackButton'
import TableReport from './TableReport'
import { IoTicketSharp } from 'react-icons/io5'
import { useAuth } from '../../context/auth'
import './styles.css';

import { userLevel } from '../../Models/User'
import { getReportRifas } from '../../Models/Rifa'

function Report() {
	const [qtdAvailable, setQtdAvailable] = useState({})
	const [qtdSold, setQtdSold] = useState([])
	const navigate = useNavigate()
	const { user } = useAuth()

	const authUserAdm = useCallback(async () => {
		const response = await userLevel(user.uid)

		if(response.status === 400)
			navigate("/rifas")

	// eslint-disable-next-line react-hooks/exhaustive-deps
	},[])
	
	useEffect(() => {
		authUserAdm()
	}, [authUserAdm])

	async function getReport(args) {
		const response = await getReportRifas(args, 'adm', user.uid)
		if(args === 'available'){
			setQtdSold([])
			setQtdAvailable(response)
		}
		if(args === 'sold'){
			setQtdAvailable({})
			setQtdSold(response)
		}
	}

	const isRifasObjetcEmpty = (obj) => {
	
		if(obj === null){
			obj = {}
		}

		if(!!Object.keys(obj).length){
			return (
				<>
					<h4 style={{ color: '#fff' }}>{`Rifas Vendias: ${qtdAvailable.sold}`}</h4>
					<h4 style={{ color: '#fff' }}>{`Rifas Disponiveis: ${qtdAvailable.available}`}</h4>
				</>
			)
		}
		
	}

	return (
		<>
			<BackButton />
			<div className='container-btn-report'>
				<button 
					className="btn btn-primary btn-report color-icons-success"
					onClick={() => {getReport('sold')}}
				><IoTicketSharp size={25} /></button>
				<button 
					className="btn btn-primary btn-report color-icons-danger"
					onClick={() => {getReport('available')}}	
				><IoTicketSharp size={25} /></button>
			</div>
			<div className='container-report'>
					{qtdSold.length > 0 ? <TableReport reports={qtdSold} /> : ''}
					{isRifasObjetcEmpty(qtdAvailable)}
			</div>
		</>
		
	);
}

export default Report;
