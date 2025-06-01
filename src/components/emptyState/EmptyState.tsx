import empty from "../../assets/image/Empty.png";
import scss from "./EmptyState.module.scss";
const EmptyState = () => {
  return (
    <div className={scss.EmptyState}>
      <img src={empty} alt="" className={scss.imgEmpty} />
      <h1>Empty...</h1>
    </div>
  );
};

export default EmptyState;
