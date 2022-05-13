import { useNavigate } from 'react-router-dom'
import { AiOutlineLogout } from 'react-icons/ai'
import { useAuth } from '../../context/auth'
import './styles.css'

function LogoutButton() {

	const navigate = useNavigate()
	const { Logout } = useAuth();

	function LogoutSis() {
		Logout()
		navigate("/")
	}
	return <AiOutlineLogout className='btn-logout' onClick={LogoutSis} />;
}

export default LogoutButton;
