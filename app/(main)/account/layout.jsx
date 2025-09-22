import SideNav from "@/app/_components/account/SideNav";

function Layout({ children }) {
  return (
    <div className="flex min-h-screen flex-col sm:flex-row">
      <SideNav />

      <div className="_mt-4 px-4 py-2 sm:flex-1 xl:px-10">{children}</div>
    </div>
  );
}

export default Layout;
