import { useState } from 'react'
import { useAuth } from '../../context/auth'
import './styles.css'
function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState({})

  const { Login } = useAuth();

  async function handleLogin(e) {
    e.preventDefault()

    if(!email && !password)
      return

    const response = await Login({
    email,
    password,
    });

    if(response.status === 400) {
      switch (response.data) {
        case 'auth/user-not-found':
          setError({ label: 'email', text: 'Usuário não encontrado'})
          break;
        case 'auth/wrong-password':
          setError({ label: 'password', text: 'Senha Incorreta'})
          break;
      
        default:
          break;
      }          
    }

  }

  function handleInput(e) {

    switch (e.target.name) {
      case 'email':
        setEmail(e.target.value)
        break;
      case 'password':
        setPassword(e.target.value)
        break;
    
      default:
        break;
    }
    
  }
    return (
      <>        
        <form className='container' onSubmit={handleLogin}>  
          <h2>Rifas Easy</h2>              
          <div className='form-group'>
            <input type="email" name='email' placeholder='Login' onChange={handleInput} required />
            { error.label === 'email' ? <span style={{ color: 'red', fontSize: '10pt', textAlign: 'center', width: '100%' }}>{error.text}</span> : '' }
            
          </div> 
          <div className='form-group'>
            <input type="password" name='password' placeholder='Senha' onChange={handleInput} required /> 
            { error.label === 'password' ? <span style={{ color: 'red', fontSize: '10pt', textAlign: 'center', width: '100%' }}>{error.text}</span> : '' } 
          </div>
            <button className='btn btn-block btn-primary' type='submit'>Entrar</button> 
        </form>
      </>
    );
}

export default Login;
