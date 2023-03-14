import { FC, Dispatch, MouseEvent } from "react";
import { useFormik } from "formik";
import "./form.css";
import cancel from "../../assets/icons/cancel.svg";
import accept from "../../assets/icons/accept.svg";
import { TodoI } from "../Todo/Todo";

interface FormI {
  form: boolean;
  setForm: Dispatch<React.SetStateAction<boolean>>;
}

const Form: FC<FormI> = ({ form, setForm }) => {
  const cancelHandler = (e: MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault;
    setForm(false);
  };
  const formik = useFormik<TodoI>({
    initialValues: {
      title: "",
      description: "",
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });
  return form ? (
    <div className="form">
      <form onSubmit={formik.handleSubmit}>
        <input
          className="form__input"
          type="text"
          id="title"
          name="title"
          placeholder="Title"
        />
        <textarea
          className="form__input"
          id="description"
          name="description"
          placeholder="Description"
        />
        <div className="form__buttons">
          <button className="form__button" onClick={cancelHandler}>
            <img src={cancel} alt="cancel" />
          </button>
          <button className="form__button">
            <img src={accept} alt="accept" />
          </button>
        </div>
      </form>
    </div>
  ) : null;
};

export default Form;
