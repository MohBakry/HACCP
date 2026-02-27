import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import './assets/fonts/fonts.css';

// Import Bootstrap and Font Awesome CSS
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Provider } from 'react-redux';
import { store } from './Redux/store.js';
import { GlobalWorkerOptions } from 'pdfjs-dist';
import pdfWorker from 'pdfjs-dist/build/pdf.worker.min?url';
import { ToastProvider } from './shared/toast/ToastContext.jsx';

GlobalWorkerOptions.workerSrc = pdfWorker;

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <ToastProvider>
      <StrictMode>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </StrictMode>
    </ToastProvider>
  </Provider>
);
