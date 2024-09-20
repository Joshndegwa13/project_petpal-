import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { Authprovider } from './context/authcontext.jsx';
import { UserProvider } from './context/UserContext.jsx'; // Import UserProvider
import FirebaseImageUpload from './components/FirebaseImageUpload';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Authprovider>
      <UserProvider> {/* Wrap App with both providers */}
        <App />
        <FirebaseImageUpload />
      </UserProvider>
    </Authprovider>
  </StrictMode>
);
