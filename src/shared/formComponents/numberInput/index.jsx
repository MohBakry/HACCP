import { useField } from 'formik';

const NumberInput = ({ label, required, ...props }) => {
  const [field, meta] = useField(props.name);

  return (
    <div className="mb-3">
      <label className="form-label">
        {label}
        {required && <span className="text-danger"> *</span>}
      </label>

      <input
        type="number"
        className={`form-control ${
          meta.touched && meta.error ? 'is-invalid' : ''
        }`}
        {...field}
        {...props}
      />

      {meta.touched && meta.error && (
        <div className="invalid-feedback">{meta.error}</div>
      )}
    </div>
  );
};

export default NumberInput;
