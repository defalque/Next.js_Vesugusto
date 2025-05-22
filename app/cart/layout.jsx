function Layout({ children }) {
  return (
    <div className="flex flex-col gap-8 px-40 mt-12">
      <h1 className="text-5xl font-medium tracking-wide">Il mio carrello</h1>
      {children}
    </div>
  );
}

export default Layout;
