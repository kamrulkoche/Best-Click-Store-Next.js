import { faFacebookF, faTwitter, faYoutube } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export default function MechanicFooter() {
    return (
        <>
            <footer className="footer px-14 py-6 bg-cyan-500 text-white">
                <div className="pl-16">
                    <span className="footer-title">Services</span>
                    <a className="link link-hover">Branding</a>
                    <a className="link link-hover">Design</a>
                    <a className="link link-hover">Marketing</a>
                    <a className="link link-hover">Advertisement</a>
                </div>
                <div>
                    <span className="footer-title">Company</span>
                    <a className="link link-hover">About us</a>
                    <a className="link link-hover">Contact</a>
                    <a className="link link-hover">Jobs</a>
                    <a className="link link-hover">Press kit</a>
                </div>
                <div>
                    <span className="footer-title">Legal</span>
                    <a className="link link-hover">Terms of use</a>
                    <a className="link link-hover">Privacy policy</a>
                    <a className="link link-hover">Cookie policy</a>
                </div>
                <div>
                    <span className="footer-title">Social</span>
                    <div className="grid grid-flow-row gap-4">
                        <FontAwesomeIcon icon={faFacebookF} />
                        <FontAwesomeIcon icon={faYoutube} />
                        <FontAwesomeIcon icon={faTwitter} />
                    </div>
                </div>
            </footer>
            <footer className="footer footer-center p-3 bg-cyan-600 text-white">
                <div>
                    <p>Copyright © 2023 - All right reserved by Best Click Store</p>
                </div>
            </footer>

        </>
    )
}