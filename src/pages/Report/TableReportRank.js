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
						<th className="t-small">#</th>
						<th className="t-medium">Nome</th>
						<th className="t-medium">Vendas</th>
					</tr>
				</thead>
				
				<tbody>
					{
						reports.map( (rep, index) => (
							<tr key={rep.name}>
								<td style={{color: '#fff945'}}>{(index+1)}</td>
								<td>{ convertSaleMan(rep.name) }</td>
								<td>{rep.sales}</td>
							</tr>
						))
					}
				</tbody>
			</table>

	);
}

export default Report;
