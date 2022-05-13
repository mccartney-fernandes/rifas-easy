import { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { FaFile, FaImage } from 'react-icons/fa'
import { MdOutlineAttachMoney } from 'react-icons/md'
import { ImListNumbered } from 'react-icons/im'
import './styles.css'

import LogoutButton from '../../Components/LogoutButton'

import { useAuth } from '../../context/auth'
import { userLevel } from '../../Models/User'

function Dashboard() {

	const confirmLevel = useCallback(async () => {
		const response = await userLevel(user.uid)
			
			if(response.status === 400)
				setIsAdm(false)
			
			if(response.status === 200)
				setIsAdm(true)
	
	// eslint-disable-next-line react-hooks/exhaustive-deps
	},[])

	useEffect(() => {
		confirmLevel()
	}, [confirmLevel])

	const [ isAdm, setIsAdm ] = useState(false)

	const { user } = useAuth()


	return (
		<>
			<LogoutButton />
			<div className='container-link'>			
				<Link
						className="rifas-link"
						to="/rifas"
				>
						<MdOutlineAttachMoney style={{fontSize: 20, marginRight: 5}} />Vender
				</Link>						
				<Link
						className="rifas-link"
						to="/images"
				>
						<FaImage style={{fontSize: 20, marginRight: 5}} />Imagens
				</Link>
				{
					isAdm ?
					<Link
							className="rifas-link"
							to="/gerar"
					>
							<ImListNumbered style={{fontSize: 20, marginRight: 5}} /> Gerar
					</Link>
					:
					''
				}	
				{
					isAdm ?
					<Link
							className="rifas-link"
							to="/"
					>
							<FaFile style={{fontSize: 20, marginRight: 5}} />
							Relatório
					</Link>
					:
					''
				}	
			</div>
		</>
	);
}

export default Dashboard;
