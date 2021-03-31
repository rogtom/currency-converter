import React, { useEffect } from 'react';
import {
	Grid,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow,
	Typography,
} from '@material-ui/core';
import { useSelector } from 'react-redux';

const totalValue = (el1, el2) => {
	return Number.parseFloat(+el1 * +el2).toFixed(2);
};

const TransactionList = () => {
	const currentTransactionList = useSelector(
		(state) => state.converter.transactionList
	);

	const currentRate = useSelector((state) => state.converter.rate);

	const maxTransactionValue = () => {
		let a = currentTransactionList.filter((el) => Math.max(el.value));
		return a[0];
	};
	console.log(maxTransactionValue().length);

	return (
		<Paper>
			<Typography
				variant='h5'
				component='h2'
				align='center'
				color='textSecondary'>
				Transaction List
			</Typography>
			<Grid container alignItems='center' spacing={4}>
				<Grid item xs={6}>
					<Table>
						<TableHead>
							<TableRow>
								<TableCell align='right'>Nr</TableCell>
								<TableCell align='right'>Name</TableCell>
								<TableCell align='right'>value</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{currentTransactionList.map((el, index) => (
								<TableRow key={el.id}>
									<TableCell align='right'>
										{index + 1}
									</TableCell>
									<TableCell align='right'>
										{el.title}
									</TableCell>
									<TableCell align='right'>
										{totalValue(el.value, currentRate)}
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</Grid>
				<Grid item xs={6}>
					<Typography align='center'>Highest transaction</Typography>

					<Typography>
						{`Name: ${maxTransactionValue().title}`}
					</Typography>
					<Typography>
						{`Value: ${totalValue(
							maxTransactionValue().value,
							currentRate
						)} PLN`}
					</Typography>
				</Grid>
			</Grid>
		</Paper>
	);
};

export default TransactionList;
