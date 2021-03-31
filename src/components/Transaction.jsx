import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { Box, Button, TextField, Typography } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { saveTransaction } from '../features/converterSlice';

const useStyles = makeStyles((theme) => ({
	modal: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
	paper: {
		backgroundColor: theme.palette.background.paper,
		border: '2px solid #000',
		boxShadow: theme.shadows[5],
		padding: theme.spacing(2, 4, 3),
		minWidth: '350px',
		minHeight: '300px',
	},
	form: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
	},
	field: {
		margin: '10px 0',
	},
}));

export default function TransitionsModal({ open, handleClose }) {
	const [name, setName] = useState('');
	const [amount, setAmount] = useState('');
	const [validate, setValidate] = useState({
		titleIsValid: false,
		titleErrMessage: '',

		amountIsValid: false,
		amountErrMessage: '',
	});
	const classes = useStyles();
	const currentRate = useSelector((state) => state.converter.rate);
	const dispatch = useDispatch();

	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(
			saveTransaction({
				title: name,
				value: +amount,
				id: Date.now(),
			})
		);
		setName('');
		setAmount('');
		handleClose();
	};
	const nameValidation = () => {
		name.length === 0
			? setValidate({
					...validate,
					titleIsValid: true,
					titleErrMessage: 'Transaction must have a name',
			  })
			: setValidate({ ...validate, titleIsValid: false });
	};
	const amountValidation = () => {
		amount < 0 || amount.length === 0
			? setValidate({
					...validate,
					amountIsValid: true,
					amountErrMessage: `transaction must have value,
						greater then 0`,
			  })
			: setValidate({
					...validate,
					amountIsValid: false,
					amountErrMessage: '',
			  });
	};
	const resultOfExchange = Number.parseFloat(+currentRate * +amount).toFixed(
		2
	);

	return (
		<div>
			<Modal
				aria-labelledby='transition-modal-title'
				aria-describedby='transition-modal-description'
				className={classes.modal}
				open={open}
				onClose={handleClose}
				closeAfterTransition
				BackdropComponent={Backdrop}
				BackdropProps={{
					timeout: 500,
				}}>
				<Fade in={open}>
					<div className={classes.paper}>
						<h2>New Transaction</h2>
						<form
							className={classes.form}
							noValidate
							onSubmit={handleSubmit}>
							<Box display='flex' flexDirection='column'>
								<TextField
									className={classes.field}
									error={validate.titleIsValid}
									margin='dense'
									variant='outlined'
									size='small'
									label='Name of transaction'
									autoComplete='off'
									value={name}
									onBlur={() => {
										nameValidation();
									}}
									helperText={validate.titleErrMessage}
									onChange={(e) => setName(e.target.value)}
								/>
								<TextField
									className={classes.field}
									error={validate.amountIsValid}
									variant='outlined'
									size='small'
									label='Set amount'
									type='number'
									value={amount}
									onBlur={() => amountValidation()}
									helperText={validate.amountErrMessage}
									onChange={(e) => {
										setAmount(e.target.value);
									}}
								/>
							</Box>
							<Typography align='center'>
								{`${resultOfExchange} PLN`}
							</Typography>
							<Button
								disabled={
									validate.amountIsValid &&
									validate.titleIsValid
								}
								variant='contained'
								color='primary'
								type='submit'>
								submit
							</Button>
						</form>
					</div>
				</Fade>
			</Modal>
		</div>
	);
}
