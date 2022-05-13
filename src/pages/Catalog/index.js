import React from 'react'
import BackButton from '../../Components/BackButton'
import { Slider } from '../../Components/Slider'
// import LogoutButton from '../../Components/LogoutButton'

import './styles.css'

function Catalog() {
	return (
		<>
		<BackButton />
		<div className="example-container">
			<Slider />
		</div>
		</>
		
	);
}

export default Catalog;
