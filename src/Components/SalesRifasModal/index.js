import { useState } from 'react'
import InputMask from 'react-input-mask'
import { useAuth } from '../../context/auth'
import './styles.css'

const SalesRifaModal = ({ closeModal, rifa, salesRifa }) => {
 
	const [buyer, setBuyer] = useState('')
	const [phone, setPhone] = useState('')

	const { user } = useAuth()

	function preSafe(e){
		e.preventDefault()
		
		salesRifa({ ...rifa, buyer: buyer.toUpperCase(), phone, salesman: user.email, status: 'sold' })

	}
	
	const handleInput = (e) =>{
		switch (e.target.name) {
			case 'buyer':
			setBuyer(e.target.value)
			break;

			case 'phone':
			setPhone(e.target.value)
			break;

			default:
			break;
	}
		
  }
  
	return (
		<div className='modal-background'>
			<div className='modal'>
				<div className='modal-head'>
					<span onClick={() => closeModal(rifa)}>X</span>
				</div>	
				<h3>Venda de Rifa</h3>								
				<div className='modal-body'>
						<form className='container-form-modal' onSubmit={preSafe}>
						<div className='form-group-modal' style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
							<label>Rifa:</label>
							<span
								style={{
									fontSize: 50,
									fontWeight: 'bold'
								}}
							>{rifa.number}</span>
																		
						</div> 
						<div className='form-group-modal'>
							<label htmlFor='name'>Nome:</label>
							<input type="text" name='buyer' onChange={handleInput} placeholder="Digite o nome do comprador" required /> 
						</div>
						<div className='form-group-modal'>
							<label htmlFor='name'>Telefone:</label>
							<InputMask type="text" name='phone' mask="(99)9.9999-9999" onChange={handleInput} placeholder="(87)9.9999-9999" required /> 
						</div>
						<div className='form-group-modal'>
							<button className='btn btn-block btn-secondary' type='submit'>Vender</button> 
						</div> 
					</form>
				</div>
			</div>
		</div>
	);
}

export default SalesRifaModal;
