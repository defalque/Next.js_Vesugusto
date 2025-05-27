import SideNavigation from "../_components/ui/SideNavigation";

function Layout({ children }) {
  return (
    <div className="flex">
      <SideNavigation></SideNavigation>
      <div className="flex-1 ml-56 py-2 px-12 mt-5">{children}</div>
    </div>
  );
}

export default Layout;
