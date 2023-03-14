import { FC, Dispatch, MouseEvent } from "react";
import { useFormik } from "formik";
import { nanoid } from "nanoid";
import "./form.css";
import cancel from "../../assets/icons/cancel.svg";
import accept from "../../assets/icons/accept.svg";
import { TodoI } from "../Todo/Todo";

interface FormI {
  form: boolean;
  setForm: Dispatch<React.SetStateAction<boolean>>;
  setTodos: Dispatch<React.SetStateAction<TodoI[]>>;
}

const Form: FC<FormI> = ({ form, setForm, setTodos }) => {
  const cancelHandler = (e: MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault;
    setForm(false);
  };
  const formik = useFormik<TodoI>({
    initialValues: {
      id: "",
      title: "",
      description: "",
    },
    onSubmit: (values) => {
      setTodos((prev) => [
        ...prev,
        { id: nanoid(), title: values.title, description: values.description },
      ]);
      formik.resetForm();
      setForm(false);
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
          onChange={formik.handleChange}
          value={formik.values.title}
        />
        <textarea
          className="form__input"
          id="description"
          name="description"
          placeholder="Description"
          onChange={formik.handleChange}
          value={formik.values.description}
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
