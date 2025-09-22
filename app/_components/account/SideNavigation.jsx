function SideNavigation({ isOpen, children }) {
  return (
    <aside
      className={`dark:border-r-dark-400 _lg:border-r border-r-gray-100 px-4 py-1 md:py-4 ${isOpen ? "" : "hidden"} row-span-full h-full`}
    >
      {children}
    </aside>
  );
}

export default SideNavigation;
