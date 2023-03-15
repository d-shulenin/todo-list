import { FC, Dispatch, MouseEvent, useState, ChangeEvent } from "react";
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
  const [currentTag, setCurrentTag] = useState<number>(0);
  const [tags, setTags] = useState<string[]>(Array(4).fill(""));
  const closeForm = (e: MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault;
    formik.resetForm();
    setTags(Array(4).fill(""));
    setForm(false);
  };
  const tagsInputChangeHandler = (e: ChangeEvent<HTMLInputElement>): void => {
    setTags((prev) => {
      const newTags = [...prev];
      newTags[currentTag] = e.target.value;
      return newTags;
    });
  };
  const formik = useFormik<TodoI>({
    initialValues: {
      id: "",
      title: "",
      description: "",
      tags: [],
    },
    onSubmit: (values) => {
      setTodos((prev) => [
        ...prev,
        {
          id: nanoid(),
          title: values.title,
          description: values.description,
          tags: tags,
        },
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
        <input
          className="form__input"
          type="text"
          placeholder="Tag"
          value={tags[currentTag]}
          onChange={tagsInputChangeHandler}
        />
        <div className="form__tags">
          {[1, 2, 3, 4].map((tag, index) => (
            <button
              key={tag}
              className={
                index === currentTag
                  ? "form__tag form__tag_active"
                  : "form__tag"
              }
              type="button"
              onClick={() => setCurrentTag(index)}
            >
              {tag}
            </button>
          ))}
        </div>
        <div className="form__buttons">
          <button className="form__button" onClick={closeForm}>
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
