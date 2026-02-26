import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import StoreProvider from '@/redux/StoreProvider';
import './index.css';
import { AuthProvider } from './hooks/firebaseUseAuth';
import App from './app';

// import './style.css';

const rootElement = document.getElementById('root')!;

if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    // <StrictMode>
    <StoreProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </StoreProvider>,
    // </StrictMode>
  );
}
