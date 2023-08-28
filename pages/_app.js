import '../styles/globals.css';
import { AuthProvider } from './session/session';

export default function App({ Component, pageProps }) {

  return(    <AuthProvider>

    <Component {...pageProps} />

    </AuthProvider>);

}