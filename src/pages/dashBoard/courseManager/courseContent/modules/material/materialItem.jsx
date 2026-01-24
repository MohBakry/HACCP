import { Button } from 'react-bootstrap';

const MaterialItem = ({ material, onDelete }) => {
  return (
    <div className="d-flex justify-content-between align-items-center mb-2">
      <div>
        <i className="fas fa-file-pdf me-2" />
        {material.title}
      </div>

      <Button
        variant="link"
        className="text-danger"
        onClick={() => onDelete(material._id)}
      >
        <i className="fas fa-trash" />
      </Button>
    </div>
  );
};

export default MaterialItem;
