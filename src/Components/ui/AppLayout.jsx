function AppLayout({ children }) {
	return (
		<>
			<div className="background-blur" />
			<div className="box">{children}</div>
		</>
	);
}

export default AppLayout;
