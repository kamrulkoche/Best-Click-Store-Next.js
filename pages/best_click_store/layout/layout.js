import Header from "./header";
import Footer from "./footer";
import Navigation from "./navigation";

export default function Layout({ children }) {
    return (
        <>
            <Header></Header>
            <Navigation>
            {children}
            </Navigation>
            <Footer></Footer>
        </>
    )
}