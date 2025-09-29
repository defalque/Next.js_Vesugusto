import Header from "../_components/ui/header/Header";
import { Toaster } from "react-hot-toast";
import { toastStyle } from "../_lib/constants";
import Footer from "../_components/ui/footer/Footer";

function Layout({ children }) {
  return (
    <>
      <Header />

      {/* <div className="flex-1 bg-inherit"> */}
      <main className="mx-auto w-full flex-1 bg-inherit">{children}</main>
      {/* </div> */}

      <Footer />

      <Toaster
        position="top-right"
        gutter={12}
        toastOptions={{
          custom: {
            duration: 10000,
          },
          success: {
            duration: 5000,
          },
          error: {
            duration: 5000,
          },
          style: toastStyle,
        }}
      />
    </>
  );
}

export default Layout;
