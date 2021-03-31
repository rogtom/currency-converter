import React from 'react';
import { Box, Container, Grid, Typography } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import Converter from './components/Converter';
import TransactionList from './components/TransactionList';
import TransitionsModal from './components/Transaction';

function App() {
	const [open, setOpen] = React.useState(false);

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};
	return (
		<Container>
			<CssBaseline />
			<Box mt={10} mb={5}>
				<Typography
					variant='h3'
					component='h1'
					align='center'
					color='primary'>
					Currency Converter
				</Typography>
			</Box>
			<Grid container spacing={2}>
				<Grid item xs={12} md={4}>
					<Converter handleOpen={handleOpen} />
				</Grid>
				<Grid item xs={12} md={8}>
					<TransactionList />
				</Grid>
			</Grid>
			<TransitionsModal
				open={open}
				handleOpen={handleOpen}
				handleClose={handleClose}
			/>
		</Container>
	);
}

export default App;
