import { logoIconsList } from "../constants";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="flex flex-col justify-center">
          <p>Terms & Conditions</p>
        </div>
        <div className="socials">
          {logoIconsList.map((socialIcon, index) => (
            <a 
              key={index} 
              href={socialIcon.link} 
              target="_blank" 
              rel="noopener noreferrer"
              className="icon hover:scale-110 transition-transform"
            >
              <img src={socialIcon.imgPath} alt={socialIcon.name} />
            </a>
          ))}
        </div>
        <div className="flex flex-col justify-center">
          <p className="text-center md:text-end">
            © {new Date().getFullYear()} Team BRIGHTSTARS. Vote Bright Morgan for BBNaija Season 10 Winner.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
