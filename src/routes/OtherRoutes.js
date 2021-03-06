import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Catalog from '../pages/Catalog';
import Dashboard from '../pages/Dashboard';
import GenerateRifa from '../pages/GenerateRifa';
import Report from '../pages/Report';
import ReportUserLogin from '../pages/Report/ReportUserLogin';

import Rifas from '../pages/Rifas'

const OtherRoutes = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Dashboard />} />
				<Route path="/rifas" element={<Rifas />} />
				<Route path="/gerar" element={<GenerateRifa />} />				
        <Route path="/images" element={<Catalog />} />
        <Route path="/repor" element={<Report />} />
        <Route path="/repor-user-login" element={<ReportUserLogin />} />
			</Routes>
		</BrowserRouter>
	);
};

export default OtherRoutes;
