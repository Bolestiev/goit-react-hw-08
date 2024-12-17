import s from "./Contact.module.css";
import { GiNinjaHead } from "react-icons/gi";
import { FaPhoneAlt } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { deleteContact } from "../../redux/contacts/operations";
const Contact = ({ id, name, number }) => {
  const dispatch = useDispatch();

  return (
    <>
      <div className={s.contact_data}>
        <div className={s.contact_icon}>
          <GiNinjaHead className={s.icon} />
          <p className={s.contact_name}>{name}</p>
        </div>
        <div className={s.contact_icon}>
          <FaPhoneAlt className={s.icon} />
          <p className={s.contact_number}>{number}</p>
        </div>
      </div>
      <button
        onClick={() => {
          dispatch(deleteContact(id));
        }}
        className={s.btn_delete}
        type="button"
      >
        Delete
      </button>
    </>
  );
};

export default Contact;
