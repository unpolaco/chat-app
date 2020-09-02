const styles = (theme) => ({
	chatViewContainer: {
		flex: '1',
	},
	paper: {
		display: 'flex',
		flexDirection: 'column',
		top: '50px',
		height: 'calc(100vh - 150px)',
		padding: '40px',
		overflowY: 'scroll',
		textAlign: 'left',
	},
	chatHeader: {
		textAlign: 'center',
	},
	message: {
		padding: '10px 20px',
		wordWrap: 'break-word',
		marginTop: '10px',
		color: 'white',
		minWidth: '200px',
		maxWidth: '400px',
		borderRadius: '10px',
	},
	userSent: {
		alignSelf: 'flex-end',
		backgroundColor: 'green',
	},
	friendSent: {
		alignSelf: 'flex-start',
		backgroundColor: 'yellowgreen',
	},
});

export default styles;
