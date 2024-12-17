import { ErrorMessage, Field, Form, Formik } from "formik";
import s from "./ContactForm.module.css";
import { useId } from "react";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { addContact } from "../../redux/contacts/operations";

const FeedbackSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  number: Yup.string()
    .matches(
      /^\d{3}-\d{3}-\d{4}$/,
      "Invalid format! Expected format: XXX-XXX-XXXX"
    )
    .required("Required"),
});

const formatNumber = (value) => {
  const digits = value.replace(/\D/g, "");
  return digits
    .replace(/(\d{3})(\d{3})?(\d{4})?/, (match, g1, g2, g3) =>
      [g1, g2, g3].filter(Boolean).join("-")
    )
    .slice(0, 12);
};

const ContactForm = () => {
  const initialValues = {
    name: "",
    number: "",
  };

  const dispatch = useDispatch();

  const onSubmit = (values, actions) => {
    dispatch(
      addContact({
        name: values.name,
        number: values.number,
      })
    );

    actions.resetForm();
  };

  const nameFieldId = useId();
  const numberFieldId = useId();

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={FeedbackSchema}
    >
      {({ setFieldValue, values }) => (
        <Form className={s.form}>
          <div className={s.label_wrapper}>
            <label className={s.label} htmlFor={nameFieldId}>
              Name
            </label>
            <Field
              placeholder="Enter Name"
              className={s.input}
              type="text"
              name="name"
              id={nameFieldId}
            />
            <ErrorMessage
              className={s.errprMessage}
              name="name"
              component="span"
            />
          </div>
          <div className={s.label_wrapper}>
            <label className={s.label} htmlFor={numberFieldId}>
              Number
            </label>
            <Field name="number">
              {({ field }) => (
                <input
                  {...field}
                  placeholder="Enter Number"
                  className={s.input}
                  id={numberFieldId}
                  type="text"
                  value={formatNumber(values.number)}
                  onChange={(e) =>
                    setFieldValue("number", formatNumber(e.target.value))
                  }
                />
              )}
            </Field>
            <ErrorMessage
              className={s.errprMessage}
              name="number"
              component="span"
            />
          </div>
          <button className={s.btn_submite} type="submit">
            Add Contact
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default ContactForm;
