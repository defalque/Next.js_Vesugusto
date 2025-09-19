import ToggleMenu from "../_components/account/ToggleMenu";
import SideNav from "../_components/account/SideNav";

function Layout({ children }) {
  return (
    <div className="grid min-h-screen grid-cols-[auto_1fr] grid-rows-[auto_1fr] lg:grid-cols-[auto_1fr]">
      <ToggleMenu>
        <SideNav />
      </ToggleMenu>

      <div className="row-start2 col-start-2 flex-1 px-4 py-2 xl:px-20">
        {children}
      </div>
    </div>
  );
}

export default Layout;
