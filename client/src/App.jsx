import './App.css';
import Main from './pages/Main';
import { AuthProvider } from './auth/auth';

export default function App() {
  
  return (
    <AuthProvider>
      <Main/>
    </AuthProvider>
  );
}
