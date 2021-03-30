import { Paper, Typography } from '@material-ui/core';
import React from 'react';

const TransactionList = () => {
	return (
		<Paper>
			<Typography
				variant='h5'
				component='h2'
				align='center'
				color='textSecondary'>
				Transaction List
			</Typography>
		</Paper>
	);
};

export default TransactionList;
