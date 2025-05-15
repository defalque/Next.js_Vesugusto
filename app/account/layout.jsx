import SideNavigation from "../_components/ui/SideNavigation";

function Layout({ children }) {
  return (
    <div className="grid grid-cols-[16rem_1fr] h-full">
      <SideNavigation></SideNavigation>
      <div className="py-2 px-12 mt-5">{children}</div>
    </div>
  );
}

export default Layout;
