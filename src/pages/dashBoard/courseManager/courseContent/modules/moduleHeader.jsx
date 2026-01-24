// modules/ModuleHeader.jsx
import { Dropdown } from 'react-bootstrap';
import styles from '../styles.module.css';

const ModuleHeader = ({ module }) => {
  return (
    <div className="d-flex justify-content-between align-items-center w-100">
      <span>
        {module.title} {module.video ? '🎥' : '⚠️'}
      </span>

      {/* IMPORTANT: stopPropagation + as="span" */}
      <Dropdown onClick={(e) => e.stopPropagation()}>
        <Dropdown.Toggle
          as="span"
          className={`${styles.dropdownToggle} ${styles.cursorPointer}`}
          // onClick={(e) => e.stopPropagation()}
        >
          <i className="fas fa-ellipsis-v"></i>
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item>Edit</Dropdown.Item>
          <Dropdown.Item className="text-danger">Delete</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

export default ModuleHeader;
