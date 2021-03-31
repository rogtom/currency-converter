import React, { useState, useEffect } from 'react';
import {
	Box,
	Grid,
	IconButton,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow,
	Typography,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { useDispatch, useSelector } from 'react-redux';
import { deleteTransaction } from '../features/converterSlice';

const totalValue = (el1, el2) => {
	return Number.parseFloat(+el1 * +el2).toFixed(2);
};

const TransactionList = () => {
	const [maxValue, setMaxValue] = useState('');
	const currentRate = useSelector((state) => state.converter.rate);
	const currentTransactionList = useSelector(
		(state) => state.converter.transactionList
	);

	const dispatch = useDispatch();

	useEffect(() => {
		const max =
			currentTransactionList.length !== 0 &&
			currentTransactionList.reduce((prev, current) =>
				prev.value > current.value ? prev : current
			);
		setMaxValue(max);
	}, [currentRate, currentTransactionList, deleteTransaction]);

	const handleDelete = (transactionId) => {
		const filtered = currentTransactionList.filter(
			(el) => el.id !== transactionId
		);
		dispatch(deleteTransaction(filtered));
	};
	const sumAllTransactions = () => {
		return (
			currentTransactionList.length !== 0 &&
			currentTransactionList.reduce(
				(accum, item) => +accum + +item.value,
				0
			)
		);
	};

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
				<Grid item xs={12} md={8}>
					<Table>
						<TableHead>
							<TableRow>
								<TableCell align='right'>Nr</TableCell>
								<TableCell align='right'>Name</TableCell>
								<TableCell align='right'>EUR</TableCell>
								<TableCell align='right'>PLN</TableCell>
								<TableCell align='right'>Delete</TableCell>
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
										{el.value.toFixed(2)}
									</TableCell>
									<TableCell align='right'>
										{`${totalValue(el.value, currentRate)}`}
									</TableCell>
									<TableCell align='right'>
										<IconButton
											aria-label='delete'
											onClick={(e) =>
												handleDelete(el.id)
											}>
											<DeleteIcon
												fontSize='small'
												color='error'
											/>
										</IconButton>
									</TableCell>
								</TableRow>
							))}
							<TableRow>
								<TableCell align='right' colSpan={2}>
									Total
								</TableCell>
								<TableCell align='right' colSpan={2}>
									{`${totalValue(
										sumAllTransactions(),
										currentRate
									)} `}
								</TableCell>
							</TableRow>
						</TableBody>
					</Table>
				</Grid>
				<Grid item xs={12} md={4}>
					<Box p={2}>
						<Typography variant='h6'>
							Highest transaction
						</Typography>

						<Typography>
							{maxValue ? `Name : ${maxValue.title}` : null}
						</Typography>
						<Typography>
							{maxValue ? `EUR : ${maxValue.value} ` : null}
						</Typography>
						<Typography>
							{maxValue
								? `PLN :  ${totalValue(
										maxValue.value,
										currentRate
								  )} `
								: null}
						</Typography>
					</Box>
				</Grid>
			</Grid>
		</Paper>
	);
};

export default TransactionList;
