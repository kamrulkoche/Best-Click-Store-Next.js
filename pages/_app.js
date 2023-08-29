// pages/_app.js
import { AuthProvider } from "./customer/auth/sessionauth";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/globals.css';
import '../styles/customer.css';
function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
      <ToastContainer position="top-right" autoClose={3000} />
    </AuthProvider>
  );
}

export default MyApp;

