// pages/CourseContentPage.jsx
import { useSelector } from 'react-redux';
import ModuleAccordion from './modules/moduleAccordion';
import { Accordion } from 'react-bootstrap';
import IntroVideoUpload from './introVideoUpload';

const CourseContentPage = () => {
  const modules = useSelector(
    (state) =>
      state.courses.course?.modules || [
        {
          _id: '2',
          title: 'Sample Module',
          video: '',
          materials: [
            // {
            // _id: '1', title: 'Sample Material', fileUrl: ''
            // },
          ],
          assessments: [
            { _id: '1', title: 'Sample Assessment', description: '' },
          ],
        },
      ]
  );

  return (
    <div className="container mt-3">
      <Accordion defaultActiveKey={0}>
        <IntroVideoUpload />
        <ModuleAccordion modules={modules} />
      </Accordion>
    </div>
  );
};

export default CourseContentPage;
