// common/DragAndDrop.jsx
import { useField } from 'formik';
import styles from './styles.module.css';

const DragAndDrop = ({ name, accept, disabled, onChange }) => {
  const [field, meta, helpers] = useField(name);

  const handleChange = (e) => {
    const file = e.target.files?.[0] || null;
    helpers.setValue(file);
    onChange && onChange(file);
  };

  return (
    <label
      className={`${styles.dropZone} ${
        meta.touched && meta.error ? styles.error : ''
      } ${disabled ? styles.disabled : ''}`}
    >
      <input
        type="file"
        hidden
        accept={accept}
        onChange={handleChange}
        disabled={disabled}
      />
      {field.value?.name}

      <i className="fas fa-cloud-upload-alt fa-2x" />
      <p>Drag & drop or click to upload video</p>

      {meta.touched && meta.error && (
        <small className="text-danger mt-1">{meta.error}</small>
      )}
    </label>
  );
};

export default DragAndDrop;
