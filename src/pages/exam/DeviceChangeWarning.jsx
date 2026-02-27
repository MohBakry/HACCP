import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './styles.module.css';

export default function DeviceChangeWarningModal({
  show,
  onConfirm,
  onCancel,
}) {
  const [accepted, setAccepted] = useState(false);

  useEffect(() => {
    if (show) {
      setAccepted(false);
    }
  }, [show]);

  if (!show) return null;

  return (
    <div
      className="modal fade show d-block"
      style={{ backgroundColor: 'rgba(0,0,0,0.6)' }}
    >
      <div className="modal-dialog modal-lg">
        <div className={`modal-content ${styles.warningModal}`}>
          <div className={`modal-header ${styles.warningHeader}`}>
            <h5 className="modal-title">
              ⚠️ Important: Device/Browser Switch Detected
            </h5>
            <button
              type="button"
              className="btn-close"
              onClick={onCancel}
              disabled={accepted}
            ></button>
          </div>

          <div className="modal-body">
            <div className="alert alert-warning" role="alert">
              <h5>⚠️ Warning: Exam Progress Will Be Lost</h5>
              <p>
                We detected that you may be attempting to access this exam from
                a <strong>different browser or device</strong> than where you
                started it.
              </p>
            </div>

            <div className={styles.warningContent}>
              <h6>What happens if you continue?</h6>
              <ul>
                <li>
                  ❌ Your previous answers <strong>WILL NOT</strong> be
                  transferred
                </li>
                <li>
                  ❌ You will need to <strong>re-answer all questions</strong>
                </li>
                <li>
                  ❌ Your previous progress will be <strong>overwritten</strong>
                </li>
                <li>
                  ⏱️ Your remaining time will <strong>continue</strong> from
                  where it left off
                </li>
              </ul>

              <h6 className="mt-3">Recommendations:</h6>
              <ul>
                <li>
                  ✅ Complete the exam on the{' '}
                  <strong>original device/browser</strong>
                </li>
                <li>
                  ✅ If your exam was interrupted, use the same browser and
                  device to resume
                </li>
                <li>✅ Contact your instructor if you have technical issues</li>
              </ul>

              <div className="alert alert-info mt-3">
                <strong>💡 Tip:</strong> You can safely refresh the page or
                minimize your browser and come back later on the same device and
                browser - your progress will be saved!
              </div>

              <div className="form-check mt-3">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="understandWarning"
                  checked={accepted}
                  onChange={(e) => setAccepted(e.target.checked)}
                />
                <label className="form-check-label" htmlFor="understandWarning">
                  I understand that I will need to re-answer all questions and
                  accept the consequences of continuing on a different
                  device/browser.
                </label>
              </div>
            </div>
          </div>

          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onCancel}
              disabled={accepted}
            >
              ← Cancel & Use Original Device
            </button>
            <button
              type="button"
              className={`btn ${accepted ? 'btn-danger' : 'btn-outline-danger'}`}
              onClick={onConfirm}
              disabled={!accepted}
            >
              ⚠️ Continue Anyway
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
