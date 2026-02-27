// modules/ModuleAccordion.jsx
import { Accordion } from 'react-bootstrap';
import ModuleItem from './moduleItem';

const ModuleAccordion = ({ modules, onEditModule }) => {
  return (
    <>
      {modules.length ? (
        modules?.map((m, i) => (
          <ModuleItem
            key={m._id}
            module={m}
            eventKey={i.toString()}
            onEditModule={onEditModule}
          />
        ))
      ) : (
        <h6>No modules available</h6>
      )}
    </>
  );
};

export default ModuleAccordion;
