import Link from "next/link";
import NavLink from "../header/NavLink";
import Logo from "../Logo";
import {
  FaXTwitter,
  FaInstagram,
  FaFacebook,
  FaGithub,
  FaLinkedin,
} from "react-icons/fa6";

const links = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "Shop",
    href: "/shop",
  },
  {
    name: "Privacy policy",
    href: "#",
  },
  {
    name: "Cookie",
    href: "#",
  },
];

const socialLinks = [
  {
    href: "https://facebook.com",
    label: "Facebook",
    icon: (
      <FaFacebook className="transition-colors duration-300 hover:opacity-90" />
    ),
  },
  {
    href: "https://instagram.com",
    label: "Instagram",
    icon: (
      <FaInstagram className="transition-colors duration-300 hover:opacity-90" />
    ),
  },
  {
    href: "https://x.com",
    label: "X",
    icon: (
      <FaXTwitter className="transition-colors duration-300 hover:opacity-90" />
    ),
  },
  {
    href: "https://github.com",
    label: "GitHub",
    icon: (
      <FaGithub className="transition-colors duration-300 hover:opacity-90" />
    ),
  },
  {
    href: "https://linkedin.com",
    label: "LinkedIn",
    icon: (
      <FaLinkedin className="transition-colors duration-300 hover:opacity-90" />
    ),
  },
];

function Footer() {
  return (
    <footer
      aria-label="Informazioni sul sito"
      className="flex flex-col items-center gap-8 border-t border-gray-100 px-4 py-10 dark:border-zinc-900"
    >
      <div>
        <Logo complete isFooter />
      </div>
      <div>
        <ul className="inline-flex flex-wrap items-center justify-center gap-2">
          {links.map((link) => (
            <NavLink
              key={link.name}
              name={link.name}
              href={link.href}
              isFooter={true}
            />
          ))}
        </ul>
      </div>

      <div
        aria-label="Social media links"
        className="text-primary-950 dark:text-primary-950/90 flex items-center gap-8 text-2xl dark:opacity-70"
      >
        {socialLinks.map((social) => (
          <Link
            key={social.label}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={social.label}
            className="focus rounded-full p-1"
          >
            <span className="sr-only">{social.label}</span>
            {social.icon}
          </Link>
        ))}
      </div>

      <div className="flex flex-col items-center justify-center gap-1 text-center text-xs md:flex-row md:gap-2">
        <span>
          © {new Date().getFullYear()} Vesugusto, Inc. Tutti i diritti
          riservati.
        </span>
        <span aria-hidden="true" className="hidden md:inline">
          •
        </span>
        <span>
          Realizzato da{" "}
          <Link
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className="focus-visible:outline-primary-950 outline-primary-dark-100 rounded font-bold focus:outline focus-visible:outline-2"
            aria-label="Visita il profilo di Marco De Falco"
          >
            Marco De Falco
          </Link>
        </span>
      </div>
    </footer>
  );
}

export default Footer;
