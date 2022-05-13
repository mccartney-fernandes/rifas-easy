import { useState, useEffect, useCallback } from 'react';
import { FaCircleNotch } from 'react-icons/fa'
import { generateRifa } from '../../Models/Rifa'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/auth'

import './styles.css'

import { userLevel } from '../../Models/User'
import BackButton from '../../Components/BackButton';

function GenerateRifa() {

	const authUserAdm = useCallback(async () => {
		const response = await userLevel(user.uid)

		if(response.status === 400)
			navigate("/rifas")
		
		if(response.status === 200)
			setLoadG(true)

	// eslint-disable-next-line react-hooks/exhaustive-deps
	},[])
	
	useEffect(() => {
		authUserAdm()
	}, [authUserAdm])

    const [initial, setInitial] = useState('')
    const [final, setFinal] = useState('')
    const [loadG, setLoadG] = useState(false)
    const [disableButton, setDisableButton] = useState(false)
    const [error, setError] = useState({})
    const navigate = useNavigate()

		const { user } = useAuth();
   
    async function genRifa(e) {
        e.preventDefault()
				setDisableButton(true)
        const gerar = await generateRifa({ initial, final })

        if(gerar.status !== 200)
            return
        
        setInitial('')
        setFinal('')
				setDisableButton(false)
        setError(gerar)
        setTimeout(() => navigate("/"), 2000)
        
    }

    function handleInput(e) {

        switch (e.target.name) {
            case 'initial':
            setInitial(e.target.value)
            break;

            case 'final':
            setFinal(e.target.value)
            break;

            default:
            break;
        }
    
    }

  return(
		<>
			{ 
				loadG ?
						<>
							<BackButton />
							<div style={{ display: 'flex', flexDirection: 'column' }}>
								<h4 style={{ color: '#fff' }}>{error?.data}</h4>
								{disableButton && <h4 style={{ color: '#fff' }}> Gerando Numeros <FaCircleNotch className='spinner' /> </h4>}
								{
									!error?.data ? 
									<form onSubmit={genRifa} className="container-gerar"> 
											<div className='form-group'>
												<input type="number" name="initial" placeholder='Numero inicial' onChange={handleInput} value={initial} required disabled={disableButton}/>
											</div>
											
											<div className='form-group'>
												<input type="number" name="final" placeholder='Numero final' onChange={handleInput} value={final} required disabled={disableButton}/>
											</div>
											
											<button type='submit' className={`btn btn-primary btn-block ${disableButton && 'btn-disabled'}`}  disabled={disableButton}>Gerar</button>
									</form>
									:
									''
								}
							</div>
						</>
					:
					`Carregando Informações`
			}
		</>
	)
  
}

export default GenerateRifa;
