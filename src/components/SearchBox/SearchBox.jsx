import { useId } from "react";
import s from "./SearchBox.module.css";
import { useDispatch } from "react-redux";
import { changeFilter } from "../../redux/filters/slice";

const SearchBox = () => {
  const id = useId();
  const dispatch = useDispatch();
  const handleInputChange = (e) => {
    dispatch(changeFilter(e.target.value.trim().toLowerCase()));
  };
  return (
    <div className={s.input_wrapper}>
      <label className={s.input_label} htmlFor={id}>
        Find contacts by name
      </label>
      <input
        placeholder="Enter name"
        className={s.input}
        type="text"
        id={id}
        name="find"
        onChange={handleInputChange}
      />
    </div>
  );
};

export default SearchBox;
