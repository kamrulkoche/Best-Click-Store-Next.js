import '../styles/globals.css'
import '../styles/mechanic.css'
import { AuthProvider } from './mechanic/authentication/sessionAuthentication'; 
export default function App({ Component, pageProps }) {
  return(    <AuthProvider>
    <Component {...pageProps} />
    </AuthProvider>);
}
