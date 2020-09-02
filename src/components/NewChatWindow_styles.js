const styles = (theme) => ({
	main: {
		display: 'flex',
		flex: '1',
		alignItems: 'center',
		justifyContent: 'center',
	},
	fieldSet: {
		border: 'none',
	},
	paper: {
		display: 'flex',
		flexDirection: 'column',
		textAlign: 'center',
		maxWidth: '500px',
		minWidth: '250px',
		alignItem: 'center',
		marginTop: theme.spacing(8),
		padding: theme.spacing(3),
	},
});

export default styles;
