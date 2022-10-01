import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons'

const Footer = () => {
    return (
        <footer className='bg-neutral-900 grid'>
            <div className='flex gap-4'>
                <FontAwesomeIcon icon={faLinkedin} size={"2xl"}/>
                <FontAwesomeIcon icon={faGithub} size={"2xl"}/>
            </div>
            <div>
                <h1>Created by Nitipat Ruengsatawit</h1>
            </div>
        </footer>
    );
}

export default Footer;