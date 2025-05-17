const {
  HideFiltersProvider,
} = require("../_components/contexts/HideFiltersProvider");

function Layout({ children }) {
  return <HideFiltersProvider>{children}</HideFiltersProvider>;
}

export default Layout;
