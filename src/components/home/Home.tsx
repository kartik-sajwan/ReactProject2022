import './Home.scss';
import empty from '../../assets/empty.png';

const Home = () => {
	const a = true;
	const b = false;
	return(
		<div className='empty-watchlist'>
			{a&& b && <img src={empty} alt="" />}
			<p>No locations added to watchlist</p>
		</div>
	);
}

export { Home };