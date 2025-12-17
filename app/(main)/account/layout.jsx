import SideNav from "@/app/_components/account/SideNav";

function Layout({ children }) {
  return (
    <div className="page-padding mx-auto mt-0 flex min-h-svh max-w-[95rem] gap-2 sm:gap-5 md:mt-10 md:gap-x-8 lg:gap-x-10">
      <SideNav />

      <div className="mt-5 py-1 pl-12 sm:flex-1 sm:pl-15 md:mt-0 md:pl-56">
        {children}
      </div>
    </div>
  );
}

export default Layout;
