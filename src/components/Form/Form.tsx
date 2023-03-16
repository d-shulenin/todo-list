import { FC, Dispatch, MouseEvent, useState, ChangeEvent } from "react";
import { useFormik } from "formik";
import { nanoid } from "nanoid";
import "./form.css";
import { TodoI } from "../Todo/Todo";
import * as Yup from "yup";

interface FormI {
  form: boolean;
  setForm: Dispatch<React.SetStateAction<boolean>>;
  setTodos: Dispatch<React.SetStateAction<TodoI[]>>;
}

const Form: FC<FormI> = ({ form, setForm, setTodos }) => {
  const [currentTag, setCurrentTag] = useState<number>(0);
  const [tags, setTags] = useState<string[]>(Array(4).fill(""));
  const closeForm = (e: MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
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
    validationSchema: Yup.object({
      title: Yup.string().required("Title is required"),
      description: Yup.string(),
      tags: Yup.array().of(Yup.string()),
    }),
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
      setTags(Array(4).fill(""));
      setForm(false);
    },
  });
  return form ? (
    <form className="form" onSubmit={formik.handleSubmit}>
      <div className="form__wrapper">
        <input
          className="form__input"
          type="text"
          id="title"
          name="title"
          placeholder="Title"
          onChange={formik.handleChange}
          value={formik.values.title}
        />
        {formik.errors.title && (
          <span className="form__error">{formik.errors.title}</span>
        )}
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
      </div>
      <div className="form__buttons">
        <button
          className="form__button form__button_cancel"
          onClick={closeForm}
        />
        <button className="form__button form__button_accept" />
      </div>
    </form>
  ) : null;
};

export default Form;
