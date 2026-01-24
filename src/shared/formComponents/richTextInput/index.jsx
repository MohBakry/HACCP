import React, { useEffect } from 'react';
import { useField } from 'formik';
import { EditorContent, useEditor, useEditorState } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Link from '@tiptap/extension-link';
import { Table } from '@tiptap/extension-table';
import { TableRow } from '@tiptap/extension-table-row';
import { TableHeader } from '@tiptap/extension-table-header';
import { TableCell } from '@tiptap/extension-table-cell';
import DOMPurify from 'dompurify';
import Dropdown from 'react-bootstrap/Dropdown';
import styles from './styles.module.css';

const RichTextInput = ({ name, label, required, readOnly = false }) => {
  const [field, meta, helpers] = useField(name);

  /* =======================
     1️⃣ Create editor FIRST
     ======================= */
  const editor = useEditor({
    editable: !readOnly,
    extensions: [
      StarterKit,
      Underline,
      Link.configure({ openOnClick: false }),
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Table.configure({ resizable: true }),
      TableRow,
      TableHeader,
      TableCell,
    ],
    content: field.value || '',
    onUpdate: ({ editor }) => {
      helpers.setValue(DOMPurify.sanitize(editor.getHTML()));
    },
  });

  /* =======================
     2️⃣ Editor state flags
     ======================= */
  const editorState = useEditorState({
    editor,
    selector: (ctx) => ({
      isBold: ctx.editor.isActive('bold'),
      isItalic: ctx.editor.isActive('italic'),
      isUnderline: ctx.editor.isActive('underline'),
      isBulletList: ctx.editor.isActive('bulletList'),
      isOrderedList: ctx.editor.isActive('orderedList'),
      isParagraph: ctx.editor.isActive('paragraph'),
      headingLevel: [1, 2, 3, 4, 5, 6].find((level) =>
        ctx.editor.isActive('heading', { level })
      ),
      isTable: ctx.editor.isActive('table'),
    }),
  });

  /* =======================
     3️⃣ Sync Formik → Editor
     ======================= */
  useEffect(() => {
    if (editor && field.value !== editor.getHTML()) {
      editor.commands.setContent(field.value || '');
    }
  }, [field.value, editor]);

  if (!editor) return null;

  const currentHeadingLabel = editorState.headingLevel
    ? `H${editorState.headingLevel}`
    : '';

  return (
    <div className="mb-3">
      {label && (
        <label className="form-label">
          {label} {required && <span className="text-danger">*</span>}
        </label>
      )}

      {/* =======================
          TOOLBAR
         ======================= */}
      <div className="btn-toolbar mb-2 gap-1 flex-wrap">
        {/* Heading Dropdown */}
        <Dropdown className="me-1">
          <Dropdown.Toggle
            variant="light"
            size="sm"
            className="d-flex align-items-center p-3"
          >
            {editorState.headingLevel ? (
              <>
                <i className="fa fa-heading me-1"></i>{' '}
                <b> {editorState.headingLevel}</b>
              </>
            ) : (
              <i className="fa fa-paragraph me-1"></i>
            )}
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item
              active={editorState.isParagraph}
              onClick={() => editor.chain().focus().setParagraph().run()}
            >
              Paragraph
            </Dropdown.Item>

            {[1, 2, 3, 4, 5, 6].map((level) => (
              <Dropdown.Item
                key={level}
                active={editorState.headingLevel === level}
                onClick={() =>
                  editor.chain().focus().toggleHeading({ level }).run()
                }
              >
                Heading {level}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>

        {/* <div className="btn-group">
          <button
            type="button"
            className="btn btn-light dropdown-toggle"
            data-bs-toggle="dropdown"
          >
            <i className="fa fa-heading me-1"></i>
            {currentHeadingLabel}
          </button>

          <ul className="dropdown-menu">
            <li>
              <button
                type="button"
                className={`dropdown-item ${
                  editorState.isParagraph ? styles.isActive : ''
                }`}
                onClick={() => editor.chain().focus().setParagraph().run()}
              >
                Paragraph
              </button>
            </li>

            {[1, 2, 3, 4, 5, 6].map((level) => (
              <li key={level}>
                <button
                  type="button"
                  className={`dropdown-item ${
                    editorState.headingLevel === level ? styles.isActive : ''
                  }`}
                  onClick={() =>
                    editor.chain().focus().toggleHeading({ level }).run()
                  }
                >
                  Heading {level}
                </button>
              </li>
            ))}
          </ul>
        </div> */}

        {/* Formatting */}
        <button
          type="button"
          className={`btn btn-light ${
            editorState.isBold ? styles.isActive : ''
          }`}
          onClick={() => editor.chain().focus().toggleBold().run()}
        >
          <i className="fa fa-bold"></i>
        </button>

        <button
          type="button"
          className={`btn btn-light ${
            editorState.isItalic ? styles.isActive : ''
          }`}
          onClick={() => editor.chain().focus().toggleItalic().run()}
        >
          <i className="fa fa-italic"></i>
        </button>

        <button
          type="button"
          className={`btn btn-light ${
            editorState.isUnderline ? styles.isActive : ''
          }`}
          onClick={() => editor.chain().focus().toggleUnderline().run()}
        >
          <i className="fa fa-underline"></i>
        </button>

        {/* Lists */}
        <button
          type="button"
          className={`btn btn-light ${
            editorState.isBulletList ? styles.isActive : ''
          }`}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
        >
          <i className="fa fa-list-ul"></i>
        </button>

        <button
          type="button"
          className={`btn btn-light ${
            editorState.isOrderedList ? styles.isActive : ''
          }`}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
        >
          <i className="fa fa-list-ol"></i>
        </button>

        {/* Alignment */}
        <button
          type="button"
          className="btn btn-light"
          onClick={() => editor.chain().focus().setTextAlign('left').run()}
        >
          <i className="fa fa-align-left"></i>
        </button>

        <button
          type="button"
          className="btn btn-light"
          onClick={() => editor.chain().focus().setTextAlign('center').run()}
        >
          <i className="fa fa-align-center"></i>
        </button>

        <button
          type="button"
          className="btn btn-light"
          onClick={() => editor.chain().focus().setTextAlign('right').run()}
        >
          <i className="fa fa-align-right"></i>
        </button>

        {/* Table */}
        <button
          type="button"
          className="btn btn-light"
          onClick={() =>
            editor
              .chain()
              .focus()
              .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
              .run()
          }
        >
          <i className="fa fa-table"></i>
        </button>

        {editorState.isTable && (
          <>
            <button
              type="button"
              className="btn btn-light"
              onClick={() => editor.chain().focus().addColumnAfter().run()}
              title="Add column"
            >
              <i className="fa fa-plus me-1"></i>
              Col
            </button>
            {/* Delete Column */}
            <button
              type="button"
              className="btn btn-light"
              onClick={() => editor.chain().focus().deleteColumn().run()}
              title="Delete column"
            >
              <i className="fa fa-minus me-1"></i>
              Col
            </button>
            <button
              type="button"
              className="btn btn-light"
              onClick={() => editor.chain().focus().addRowAfter().run()}
            >
              <i className="fa fa-plus me-1"></i>Row
            </button>
            <button
              type="button"
              className="btn btn-light"
              onClick={() => editor.chain().focus().deleteRow().run()}
              title="Delete column"
            >
              <i className="fa fa-minus me-1"></i>
              Row
            </button>

            <button
              type="button"
              className="btn btn-light"
              onClick={() => editor.chain().focus().deleteTable().run()}
            >
              <i className="fa fa-trash"></i>
            </button>
          </>
        )}
      </div>

      {/* =======================
          EDITOR
         ======================= */}
      <div
        className={`border rounded p-2 ${
          meta.touched && meta.error ? 'border-danger' : ''
        }`}
        style={{ minHeight: 200, backgroundColor: 'white' }}
      >
        <EditorContent editor={editor} />
      </div>

      {meta.touched && meta.error && (
        <div className="text-danger mt-1">{meta.error}</div>
      )}
    </div>
  );
};

export default RichTextInput;
