import { FaCircleNotch, FaCheck } from 'react-icons/fa'
import './styles.css'

function ListRifas({ rifas, setRifaModal }) {

	function statusRifa(rifa) {
		if(rifa.status === 'available') {
			return (
				<p className='app-rifa available' key={rifa.number} onClick={() => setRifaModal(rifa)}>
						<code>{rifa.number}</code>
				</p>
			)
		}
		if(rifa.status === 'processing') {
			return (
				<p className='app-rifa processing' key={rifa.number}>
						<FaCircleNotch className='spinner'/> <code style={{fontSize: '1rem'}}>{rifa.number}</code>
				</p>
			)
		}
		if(rifa.status === 'sold') {
			return (
				<p className='app-rifa sold' key={rifa.number}>
						<FaCheck /> <code style={{fontSize: '1rem'}}>{rifa.number}</code>
				</p>
			)
		}
	}

    return (
        <div className='container-rifa'>
					{
						rifas.map( rifa => (statusRifa(rifa)))
					}
    		</div>
    );
}

export default ListRifas;
