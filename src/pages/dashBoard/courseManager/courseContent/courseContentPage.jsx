// pages/CourseContentPage.jsx
import { useDispatch, useSelector } from 'react-redux';
import ModuleAccordion from './modules/moduleAccordion';
import { Accordion, Button } from 'react-bootstrap';
import IntroVideoUpload from './introVideoUpload';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getCourseContent } from '../../../../Redux/courseContent/courseContent.service';
import ModuleForm from './modules/ModuleForm';
import styles from './styles.module.css';

const CourseContentPage = () => {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.courseContent);
  const { courseId } = useParams();
  const [showModuleForm, setShowModuleForm] = useState(false);
  const [editingModule, setEditingModule] = useState(null);

  useEffect(() => {
    dispatch(getCourseContent(courseId));
  }, [courseId, dispatch]);

  const handleAddModule = () => {
    setEditingModule(null);
    setShowModuleForm(true);
  };

  const handleEditModule = (module) => {
    setEditingModule(module);
    setShowModuleForm(true);
  };

  const handleCloseModuleForm = () => {
    setShowModuleForm(false);
    setEditingModule(null);
  };

  return (
    <div className="container mt-3">
      <div className="d-flex justify-content-end align-items-center mb-4 flex-wrap">
        {/* Action Buttons */}
        <div className="d-flex gap-2 mt-2 mt-sm-0">
          <Button className={`${styles.addButton}`} onClick={handleAddModule}>
            <i className="fa fa-plus me-1"></i> Add Module
          </Button>
        </div>
      </div>
      <Accordion defaultActiveKey={0}>
        <IntroVideoUpload course={data} />
        <ModuleAccordion
          modules={data?.modules || []}
          onEditModule={handleEditModule}
        />
      </Accordion>
      <ModuleForm
        show={showModuleForm}
        onHide={handleCloseModuleForm}
        module={editingModule}
        courseId={courseId}
      />
    </div>
  );
};

export default CourseContentPage;
