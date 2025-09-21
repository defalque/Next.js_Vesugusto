import SideNav from "@/app/_components/account/SideNav";
import ToggleMenu from "@/app/_components/account/ToggleMenu";
// import ToggleMenu from "../_components/account/ToggleMenu";
// import SideNav from "../_components/account/SideNav";

function Layout({ children }) {
  return (
    <div className="grid min-h-screen grid-cols-[auto_1fr] grid-rows-[auto_1fr] lg:grid-cols-[auto_1fr]">
      <ToggleMenu>
        <SideNav />
      </ToggleMenu>

      <div className="row-start2 col-start-2 mt-4 flex-1 px-4 py-2 xl:px-10">
        {children}
      </div>
    </div>
  );
}

export default Layout;
