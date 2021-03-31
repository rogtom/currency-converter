import React, { useState, useEffect } from 'react';
import { Button, Card, TextField, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';
import { saveRate } from '../features/converterSlice';
const useStyles = makeStyles({
	root: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		padding: '20px 0',
		height: '100%',
	},
	title: {
		marginBottom: 30,
	},
	userRate: {
		margin: '20px 0',
	},
	rateField: {
		marginBottom: 20,
	},
});

const Converter = ({ handleOpen }) => {
	const [rate, setRate] = useState('');
	const [validate, setValidate] = useState({
		isValid: true,
		errorMessage: '',
	});

	const dispatch = useDispatch();

	const classes = useStyles();

	useEffect(() => {
		dispatch(saveRate(+rate));
	}, [rate, dispatch]);

	const rateValidation = () => {
		const regex = /^[+]?\d+(\.\d+)?$/;
		setValidate(
			regex.test(rate)
				? { ...validate, isValid: true, errorMessage: '' }
				: {
						...validate,
						isValid: false,
						errorMessage: 'Wrong value of rate. Use eg. "x.xxxx"',
				  }
		);
	};
	return (
		<>
			<Card className={classes.root}>
				<Typography
					className={classes.title}
					variant='h5'
					component='h2'
					align='center'
					color='textSecondary'>
					Converter
				</Typography>
				<Typography className={classes.userRate}>
					1 EUR = {rate} PLN
				</Typography>

				<TextField
					error={!validate.isValid}
					className={classes.rateField}
					label='Your exchange rate'
					placeholder='type value eg. 4.441'
					variant='outlined'
					required
					size='small'
					type='number'
					value={rate}
					helperText={validate.errorMessage}
					onBlur={rateValidation}
					onChange={(e) => {
						setRate(e.target.value);
					}}
				/>

				<Button
					disabled={rate ? false : true}
					variant='contained'
					color='secondary'
					onClick={handleOpen}>
					New transacttion
				</Button>
			</Card>
		</>
	);
};

export default Converter;
