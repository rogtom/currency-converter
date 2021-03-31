import React, { useState, useEffect } from 'react';
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
	const [maxValue, setMaxValue] = useState('');
	const currentRate = useSelector((state) => state.converter.rate);
	const currentTransactionList = useSelector(
		(state) => state.converter.transactionList
	);
	useEffect(() => {
		const max =
			currentTransactionList.length !== 0 &&
			currentTransactionList?.reduce((prev, current) =>
				prev.value > current.value ? prev : current
			);
		setMaxValue(max);
		// currentTransactionList.filter((el) => Math.max(el.value))
	}, [currentRate, currentTransactionList]);

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
								<TableCell align='right'>Value</TableCell>
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
						{maxValue ? `Name: ${maxValue.title}` : null}
					</Typography>
					<Typography>
						{maxValue
							? `Value:  ${totalValue(
									maxValue.value,
									currentRate
							  )}PLN`
							: null}
					</Typography>
				</Grid>
			</Grid>
		</Paper>
	);
};

export default TransactionList;
