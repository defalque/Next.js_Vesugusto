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
import { Suspense } from "react";
import Copyright from "./Copyright";
import {
  CopyrightSkeleton,
  FooterNavLinksSkeleton,
} from "../skeleton/Skeletons";

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
      <FaFacebook
        aria-hidden
        className="size-6 transition-colors duration-300 hover:brightness-90"
      />
    ),
  },
  {
    href: "https://instagram.com",
    label: "Instagram",
    icon: (
      <FaInstagram
        aria-hidden
        className="size-6 transition-colors duration-300 hover:brightness-90"
      />
    ),
  },
  {
    href: "https://x.com",
    label: "X",
    icon: (
      <FaXTwitter
        aria-hidden
        className="size-6 transition-colors duration-300 hover:brightness-90"
      />
    ),
  },
  {
    href: "https://github.com",
    label: "GitHub",
    icon: (
      <FaGithub
        aria-hidden
        className="size-6 transition-colors duration-300 hover:brightness-90"
      />
    ),
  },
  {
    href: "https://linkedin.com",
    label: "LinkedIn",
    icon: (
      <FaLinkedin
        aria-hidden
        className="size-6 transition-colors duration-300 hover:brightness-90"
      />
    ),
  },
];

function Footer() {
  return (
    <footer
      aria-label="Informazioni sul sito"
      className="flex flex-col items-center gap-5 px-4 py-10 dark:border-zinc-900"
    >
      <Logo complete isFooter />

      <ul
        aria-label="Link principali del sito"
        className="mt-2 inline-flex flex-wrap items-center justify-center gap-2"
      >
        <Suspense fallback={<FooterNavLinksSkeleton />}>
          {links.map((link) => (
            <NavLink
              key={link.name}
              name={link.name}
              href={link.href}
              type="footer"
            >
              {link.name}
            </NavLink>
          ))}
        </Suspense>
      </ul>

      <ul
        aria-label="Social media links"
        className="text-primary-dark-200 _dark:opacity-70 flex items-center justify-center gap-8"
      >
        {socialLinks.map((social) => (
          <li key={social.label} className="flex items-center justify-center">
            <Link
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.label}
              className="focus-style rounded-full p-1"
            >
              {social.icon}
            </Link>
          </li>
        ))}
      </ul>

      <div
        role=""
        className="flex flex-col items-center justify-center gap-1 text-center text-sm md:flex-row md:gap-2"
      >
        <Suspense fallback={<CopyrightSkeleton />}>
          <Copyright />
        </Suspense>
        <span>
          Realizzato da{" "}
          <Link
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className="custom-focus rounded-full font-bold"
          >
            Marco De Falco
          </Link>
        </span>
      </div>
    </footer>
  );
}

export default Footer;
