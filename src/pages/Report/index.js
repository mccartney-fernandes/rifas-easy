import { useState, useCallback, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import BackButton from '../../Components/BackButton'
import TableReport from './TableReport'
import TableReportRank from './TableReportRank'
import { IoTicketSharp } from 'react-icons/io5'
import { FaUsers } from 'react-icons/fa'
import { useAuth } from '../../context/auth'
import './styles.css';

import { userLevel } from '../../Models/User'
import { getReportRifas } from '../../Models/Rifa'

function Report() {
	const [qtdAvailable, setQtdAvailable] = useState({})
	const [qtdSold, setQtdSold] = useState([])
	const [qtdSoldSalesman, setQtdSoldSalesman] = useState([])
	const navigate = useNavigate()
	const { user, rifas } = useAuth()

	const authUserAdm = useCallback(async () => {
		const response = await userLevel(user.uid)

		if(response.status === 400)
			navigate("/rifas")

	// eslint-disable-next-line react-hooks/exhaustive-deps
	},[])
	
	useEffect(() => {
		authUserAdm()
	}, [authUserAdm])

	async function getReport(args, group = null) {
		let response = null

		if(group){
			response = await getReportRifas(args, 'adm', user.uid, true, rifas)
			
		}else{
			response = await getReportRifas(args, 'adm', user.uid, false, rifas)
		}

		if(args === 'available'){
			setQtdSold([])
			setQtdSoldSalesman([])
			setQtdAvailable(response)
		}
		if(args === 'sold'){
			setQtdAvailable({})
			setQtdSoldSalesman([])
			setQtdSold(response)
		}

		if(args === 'sold-salesman'){
			setQtdAvailable({})
			setQtdSold([])
			setQtdSoldSalesman(response)
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
				<button 
					className="btn btn-primary btn-report"
					onClick={() => {getReport('sold-salesman', true)}}	
				><FaUsers size={25} /></button>
			</div>
			<div className='container-report'>
					{qtdSold.length > 0 ? <TableReport reports={qtdSold} /> : ''}
					{qtdSoldSalesman.length > 0 ? <TableReportRank reports={qtdSoldSalesman} /> : ''}
					{isRifasObjetcEmpty(qtdAvailable)}
			</div>
		</>
		
	);
}

export default Report;
