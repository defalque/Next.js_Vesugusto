import SideNav from "@/app/_components/account/SideNav";

function Layout({ children }) {
  return (
    <div className="page-padding mt-0 flex min-h-screen flex-col md:mt-10 md:flex-row md:gap-x-8 lg:gap-x-10">
      <SideNav />

      <div className="mt-5 sm:flex-1 md:mt-0">{children}</div>
    </div>
  );
}

export default Layout;
