import { ITag } from "../../../interfaces/interfaces";
import "./Tag.scss";

const Tag: React.FC<ITag> = ({ label, type, onClick }) => {

	const className =
    (type === "tag" && "tagBtn") ||
    "searchBtn";

	return(
		<div className="city-btn">
			<button onClick={onClick} className={className}>
				<strong>{label}</strong>
			</button>
		</div>
	);
}

export { Tag };