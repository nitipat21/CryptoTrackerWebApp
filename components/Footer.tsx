import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons'

const Footer = () => {
    return (
        <footer className='bg-neutral-900 grid justify-center p-8 gap-8 sticky  '>
            <div className='flex gap-4 justify-center'>
                <FontAwesomeIcon icon={faLinkedin} size={"2xl"} className="cursor-pointer hover:scale-110 hover:opacity-60"/>
                <FontAwesomeIcon icon={faGithub} size={"2xl"} className="cursor-pointer hover:scale-110 hover:opacity-60"/>
            </div>
            <div>
                <h1>Created by Nitipat Ruengsatawit</h1>
            </div>
        </footer>
    );
}

export default Footer;