import React from 'react'
import BackButton from '../../Components/BackButton'
import { Slider } from '../../Components/Slider'

import { useAuth } from '../../context/auth'

import './styles.css'

function Catalog() {
	const { signed } = useAuth()
	return (
		<>
		{
			signed 
			&&
			<>
				<BackButton />
			</> 
		}
		<div className="example-container">
			<Slider />
		</div>
		</>
		
	);
}

export default Catalog;
