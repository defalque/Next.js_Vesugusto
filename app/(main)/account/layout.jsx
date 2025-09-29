import SideNav from "@/app/_components/account/SideNav";

function Layout({ children }) {
  return (
    <div className="page-padding _md:mb-20 mx-auto mt-0 flex min-h-fit max-w-[95rem] flex-col md:mt-10 md:flex-row md:gap-x-8 lg:gap-x-10">
      <SideNav />

      <div className="mt-5 py-1 sm:flex-1 md:mt-0">{children}</div>
    </div>
  );
}

export default Layout;
