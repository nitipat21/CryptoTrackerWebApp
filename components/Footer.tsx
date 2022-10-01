import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Footer = () => {
    return (
        <footer>
            <div>
                <FontAwesomeIcon icon={['fab', "github"]} size={"2xl"}/>
                <FontAwesomeIcon icon={['fab', "linkedin"]} size={"2xl"}/>
            </div>
            <div>
                <h1>Created by Nitipat Ruengsatawit</h1>
            </div>
        </footer>
    );
}

export default Footer;