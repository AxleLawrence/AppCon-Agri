import facebookIcon from "../assets/icons/facebook2.svg";
import emailIcon from "../assets/icons/email2.svg";
import linkedinIcon from "../assets/icons/linkedin1.svg";

const Footer = () => {
  return (
    <footer className="bg-emerald-600 text-white py-3 mt-10 text-sm">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center text-center md:text-left">
        <div>
          <h2 className="text-lg font-semibold">Smart Agriculture</h2>
          <p className="text-xs opacity-80 mt-1">Empowering farmers with smart monitoring & analytics.</p>
        </div>

        {/* Social Icons */}
        <div className="flex space-x-3 mt-3 md:mt-0">
          <a href="/" className="hover:opacity-80 transition">
            <img src={facebookIcon} alt="Facebook" className="w-4 h-4" />
          </a>
          <a href="/" className="hover:opacity-80 transition">
            <img src={emailIcon} alt="Email" className="w-4 h-4" />
          </a>
          <a href="/" className="hover:opacity-80 transition">
            <img src={linkedinIcon} alt="LinkedIn" className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center text-xs opacity-70 mt-2">
        © 2025 Smart Agriculture. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
