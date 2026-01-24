// modules/ModuleAccordion.jsx
import { Accordion } from 'react-bootstrap';
import ModuleItem from './moduleItem';

const ModuleAccordion = ({ modules }) => {
  return (
    <>
      {modules.length ? (
        modules?.map((m, i) => (
          <ModuleItem key={m._id} module={m} eventKey={i.toString()} />
        ))
      ) : (
        <h6>No modules available</h6>
      )}
    </>
  );
};

export default ModuleAccordion;
