import React from "react";
import { useField, ErrorMessage } from "formik";
import "./textField.css";

const TextField = ({ label, className1, className2, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div className={className1}>
      <label htmlFor={field.name}>{label}</label>
      <input
        className={className2}
        autoComplete="false"
        {...field}
        {...props}
      />
      <ErrorMessage component="div" className="error" name={field.name} />
    </div>
  );
};

export default TextField;