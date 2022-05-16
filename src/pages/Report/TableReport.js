import React from 'react';

// import { Container } from './styles';

function Report({ reports }) {
	function convertSaleMan(salesman) {
		const firstName = salesman.split('@')[0].split('.')[0]
		const secondName = salesman.split('@')[0].split('.')[1]

		return `${firstName.toUpperCase()} ${secondName.toUpperCase()}`
	}
	return (

		<table className="table table-action">  
				<thead>
					<tr>
						<th className="t-small">Numero</th>
						<th className="t-medium">Comprador</th>
						<th className="t-medium">Telefone</th>
						<th className="t-medium">Vendedor</th>
					</tr>
				</thead>
				
				<tbody>
					{
						reports.map( rep => (
							<tr key={rep.id}>
								<td>{rep.number}</td>
								<td>{ rep.buyer }</td>
								<td>{ rep.phone }</td>
								<td>{ convertSaleMan(rep.salesman) }</td>
							</tr>
						))
					}
				</tbody>
			</table>

	);
}

export default Report;
