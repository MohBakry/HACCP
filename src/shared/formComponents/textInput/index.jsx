import { useField } from 'formik';
import styles from './styles.module.css';

export default function TextInput({ label, className = '', ...props }) {
  const [field, meta] = useField(props);

  const inputClasses = `
    form-control 
    ${className} 
    ${styles.input} 
    ${meta.touched && meta.error ? 'is-invalid' : ''}
  `;

  return (
    <div className={`mb-3 ${styles.formGroup}`}>
      <label
        className={`form-label ${styles.label} ${
          props.required && styles.required
        } ${props.labelClassName ? props.labelClassName : ''}`}
      >
        {label}
      </label>

      <input {...field} {...props} className={inputClasses} />

      {meta.touched && meta.error && (
        <div className={`invalid-feedback ${styles.error}`}>{meta.error}</div>
      )}
    </div>
  );
}
