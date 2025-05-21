function Layout({ children }) {
  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-5xl font-medium border-b border-b-zinc-300 pb-2 tracking-wide">
        Prodotti salvati
      </h1>
      {children}
    </div>
  );
}

export default Layout;
