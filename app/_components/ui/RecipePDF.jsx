import { parseMarkdownToPDFComponents } from "@/app/_lib/parseMarkdownToPDFComponents";
import { Document, Page, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: { padding: 30 },
});

function RecipePDF({ recipe }) {
  return (
    <Document>
      <Page style={styles.page}>
        {parseMarkdownToPDFComponents(`# ${recipe.title}`)}
        {parseMarkdownToPDFComponents(recipe.description)}
      </Page>
    </Document>
  );
}

export default RecipePDF;
