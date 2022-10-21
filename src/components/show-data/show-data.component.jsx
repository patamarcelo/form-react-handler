import "./show-data.styless.css";
const ShowData = props => {
	const { dataRetr } = props;
	return (
		<div className="main-container">
			<div className="title">
				<h1>Show Data</h1>
			</div>
            <div className="container">
			{dataRetr.map(d => {
				return (
                        <div key={d.id} className="user-info-container">
                            <div className="user-info">
						<p>
							Date: {d.birthday}
						</p>
						<p>
							Created: {d.created.seconds}
						</p>
						<p>
							email:"{d.email}
						</p>
						<p>
							Username: {d.username}
						</p>
						<p>
							Super: {d.isSuperUser ? 'IsSuper' : null}
						</p>
                        </div>
                            </div>
				);
			})}
            </div>
		</div>
	);
};

export default ShowData;
