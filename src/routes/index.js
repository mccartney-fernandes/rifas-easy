import { useState, useEffect } from 'react'
import { useAuth } from '../context/auth';

import SignRoutes from './SignRoutes';
import OtherRoutes from './OtherRoutes';

const Routes = () => {
	useEffect(()=>{
		setTimeout(() => {
			setLoad(true)
		}, 1000)
	}, [])
	
	const [load, setLoad] = useState(false)
  const { signed } = useAuth();

  return load && (signed ? <OtherRoutes /> : <SignRoutes />)
};

export default Routes;
