// materials/MaterialList.jsx
import MaterialItem from './materialItem';

const MaterialList = ({ materials = [], onDelete }) => {
  if (!materials.length) {
    return <p className="text-muted">No materials yet</p>;
  }

  return (
    <>
      {materials.map((m) => (
        <MaterialItem key={m._id} material={m} onDelete={onDelete} />
      ))}
    </>
  );
};

export default MaterialList;
