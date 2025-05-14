import DarkModeToggle from "./DarkModeToggle";
import Navigation from "./Navigation";

function Header() {
  return (
    <header className=" px-8 py-3 border-b border-orange-50 dark:border-orange-950 shadow-sm">
      <div className="flex justify-between items-center mx-auto">
        <p className="text-4xl text-orange-950 dark:text-orange-100 tracking-wider font-medium">
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
