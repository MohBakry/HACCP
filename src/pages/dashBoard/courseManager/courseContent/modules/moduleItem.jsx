// modules/ModuleItem.jsx
import { Accordion, Tabs, Tab } from 'react-bootstrap';
import ModuleHeader from './moduleHeader';
import ModuleVideoUpload from './moduleVideoUpload';
import MaterialsTab from './material/materialsTab';
import AssessmentsTab from './assessment/assessmentTab';

const ModuleItem = ({ module, eventKey }) => {
  return (
    <Accordion.Item eventKey={eventKey + 1}>
      <Accordion.Header>
        <ModuleHeader module={module} />
      </Accordion.Header>

      <Accordion.Body>
        <Tabs className="mt-3">
          <Tab eventKey="video" title="Video">
            <div className="py-4">
              <ModuleVideoUpload module={module} />
            </div>
          </Tab>
          <Tab eventKey="materials" title="Materials">
            <div className="py-4">
              <MaterialsTab module={module} />
            </div>
          </Tab>
          <Tab eventKey="assessments" title="Assessments">
            <AssessmentsTab module={module} />
          </Tab>
        </Tabs>
      </Accordion.Body>
    </Accordion.Item>
  );
};

export default ModuleItem;
