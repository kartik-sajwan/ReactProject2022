import "./Favs.scss";
import empty from "../../assets/empty.png";
import { useAppSelector } from "../../app/reducer/hook";

const Favs = () => {
  const favourites = useAppSelector((state) => state.weather.favourites);
  return (
    <div>
      {favourites.length > 0 ? (
        favourites.map((val) => <label key={val.id}>{val.name}</label>)
      ) : (
        <NoResults />
      )}
    </div>
  );
};

const NoResults = () => {
  return (
    <div className="empty-watchlist">
      <img src={empty} alt="" />
      <p>No locations added to watchlist</p>
    </div>
  );
};

export { Favs };
