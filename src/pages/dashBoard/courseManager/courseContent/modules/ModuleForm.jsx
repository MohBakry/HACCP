import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Button } from 'react-bootstrap';
import {
  addModule,
  editModule,
} from '../../../../../Redux/courseContent/courseContent.service';
import RichTextInput from '../../../../../shared/formComponents/richTextInput';
import TextInput from '../../../../../shared/formComponents/textInput';
import styles from '../styles.module.css';

const validationSchema = Yup.object({
  title: Yup.string().required('Title is required'),
  content: Yup.string().required('Content is required'),
});

// const RichTextEditor = ({ value, onChange }) => {
//   const editor = useEditor({
//     extensions: [
//       StarterKit,
//       Underline,
//       Link,
//       TextAlign.configure({
//         types: ['heading', 'paragraph'],
//       }),
//     ],
//     content: value,
//     onUpdate: ({ editor }) => {
//       onChange(editor.getHTML());
//     },
//   });

//   if (!editor) {
//     return null;
//   }

//   return (
//     <div className="border rounded p-2">
//       <div className="mb-2">
//         <button
//           type="button"
//           className="btn btn-sm btn-outline-secondary me-1"
//           onClick={() => editor.chain().focus().toggleBold().run()}
//           className={
//             editor.isActive('bold')
//               ? 'btn btn-sm btn-primary me-1'
//               : 'btn btn-sm btn-outline-secondary me-1'
//           }
//         >
//           <strong>B</strong>
//         </button>
//         <button
//           type="button"
//           className="btn btn-sm btn-outline-secondary me-1"
//           onClick={() => editor.chain().focus().toggleItalic().run()}
//           className={
//             editor.isActive('italic')
//               ? 'btn btn-sm btn-primary me-1'
//               : 'btn btn-sm btn-outline-secondary me-1'
//           }
//         >
//           <em>I</em>
//         </button>
//         <button
//           type="button"
//           className="btn btn-sm btn-outline-secondary me-1"
//           onClick={() => editor.chain().focus().toggleUnderline().run()}
//           className={
//             editor.isActive('underline')
//               ? 'btn btn-sm btn-primary me-1'
//               : 'btn btn-sm btn-outline-secondary me-1'
//           }
//         >
//           <u>U</u>
//         </button>
//         <button
//           type="button"
//           className="btn btn-sm btn-outline-secondary me-1"
//           onClick={() =>
//             editor.chain().focus().toggleHeading({ level: 1 }).run()
//           }
//           className={
//             editor.isActive('heading', { level: 1 })
//               ? 'btn btn-sm btn-primary me-1'
//               : 'btn btn-sm btn-outline-secondary me-1'
//           }
//         >
//           H1
//         </button>
//         <button
//           type="button"
//           className="btn btn-sm btn-outline-secondary me-1"
//           onClick={() =>
//             editor.chain().focus().toggleHeading({ level: 2 }).run()
//           }
//           className={
//             editor.isActive('heading', { level: 2 })
//               ? 'btn btn-sm btn-primary me-1'
//               : 'btn btn-sm btn-outline-secondary me-1'
//           }
//         >
//           H2
//         </button>
//         <button
//           type="button"
//           className="btn btn-sm btn-outline-secondary me-1"
//           onClick={() => editor.chain().focus().toggleBulletList().run()}
//           className={
//             editor.isActive('bulletList')
//               ? 'btn btn-sm btn-primary me-1'
//               : 'btn btn-sm btn-outline-secondary me-1'
//           }
//         >
//           • List
//         </button>
//         <button
//           type="button"
//           className="btn btn-sm btn-outline-secondary me-1"
//           onClick={() => editor.chain().focus().toggleOrderedList().run()}
//           className={
//             editor.isActive('orderedList')
//               ? 'btn btn-sm btn-primary me-1'
//               : 'btn btn-sm btn-outline-secondary me-1'
//           }
//         >
//           1. List
//         </button>
//       </div>
//       <EditorContent editor={editor} className="min-h-32 p-2 border rounded" />
//     </div>
//   );
// };

const ModuleForm = ({ show, onHide, module, courseId }) => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.courseContent);

  const initialValues = {
    title: module?.title || '',
    content: module?.content || '',
  };

  const handleSubmit = async (values) => {
    try {
      if (module) {
        // Edit mode
        await dispatch(
          editModule({ courseId, moduleId: module._id, moduleData: values })
        ).unwrap();
      } else {
        // Add mode
        await dispatch(addModule({ courseId, moduleData: values })).unwrap();
      }
      onHide();
    } catch (error) {
      console.error('Failed to save module:', error);
    }
  };

  return (
    <Modal show={show} onHide={onHide} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>{module ? 'Edit Module' : 'Add Module'}</Modal.Title>
      </Modal.Header>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {() => (
          <Form>
            <Modal.Body>
              <div className="mb-3">
                <TextInput
                  type="text"
                  label="Module Title"
                  id="title"
                  name="title"
                  placeholder="Enter module title"
                />
              </div>
              <div className="mb-3">
                <RichTextInput name="content" label="Module Content" required />
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={onHide}>
                Cancel
              </Button>
              <Button
                type="submit"
                className={`${styles.addButton}`}
                disabled={loading.addModule || loading.editModule}
              >
                {loading.addModule || loading.editModule
                  ? 'Saving...'
                  : module
                    ? 'Update'
                    : 'Add'}
              </Button>
            </Modal.Footer>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default ModuleForm;
