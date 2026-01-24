import { useField } from 'formik';

const FileInput = ({
  label,
  accept,
  helperText,
  required,
  onChange,
  ...props
}) => {
  const [, meta, helpers] = useField(props.name);

  return (
    <div className="mb-3">
      <label className="form-label">
        {label}
        {required && <span className="text-danger"> *</span>}
      </label>

      <input
        name={props.name}
        type="file"
        className={`form-control ${
          meta.touched && meta.error ? 'is-invalid' : ''
        }`}
        accept={accept}
        onChange={(e) => {
          const file = e.target.files?.[0] || null;
          console.log(file, 'file');

          helpers.setValue(file);
          onChange && onChange(file);
        }}
        onBlur={() => helpers.setTouched(true)}
      />

      {helperText && <div className="form-text">{helperText}</div>}

      {meta.touched && meta.error && (
        <div className="invalid-feedback">{meta.error}</div>
      )}
    </div>
  );
};

export default FileInput;
