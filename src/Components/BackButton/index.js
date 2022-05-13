import { FiArrowLeft } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'

import './styles.css';

function BackButton() {
	const navigate = useNavigate()

	return <FiArrowLeft className='btn-back' onClick={() => navigate("/")} />;
}

export default BackButton;
