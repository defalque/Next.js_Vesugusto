import { HideFiltersProvider } from "../_components/contexts/HideFiltersContext";

function Layout({ children }) {
  return <HideFiltersProvider>{children}</HideFiltersProvider>;
}

export default Layout;
