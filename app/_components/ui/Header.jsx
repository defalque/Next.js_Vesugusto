import DarkModeToggle from "./DarkModeToggle";
import Navigation from "./Navigation";

function Header() {
  return (
    <header className=" px-8 py-4 border-b border-primary-100 dark:border-primary-dark-900 shadow-sm dark:shadow-2xl">
      <div className="flex justify-between items-center mx-auto">
        <p className="text-4xl text-primary-950 dark:text-primary-100 tracking-wider font-medium">
          Vesugusto
        </p>
        <div className="flex gap-16">
          <Navigation></Navigation>
          <DarkModeToggle></DarkModeToggle>
        </div>
      </div>
    </header>
  );
}

export default Header;
