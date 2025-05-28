import { Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  paragraph: { marginBottom: 8, fontSize: 12 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 12 },
  subtitle: { fontSize: 16, fontWeight: "bold", marginBottom: 8 },
  bold: { fontWeight: "bold" },
  listItem: { marginLeft: 12, fontSize: 12, marginBottom: 4 },
});

export const parseMarkdownToPDFComponents = (markdown) => {
  const lines = markdown.split("\n");
  const elements = [];

  lines.forEach((line, idx) => {
    if (line.startsWith("## ")) {
      elements.push(
        <Text key={idx} style={styles.subtitle}>
          {line.replace(/^## /, "")}
        </Text>
      );
    } else if (line.startsWith("# ")) {
      elements.push(
        <Text key={idx} style={styles.title}>
          {line.replace(/^# /, "")}
        </Text>
      );
    } else if (line.startsWith("- ")) {
      elements.push(
        <Text key={idx} style={styles.listItem}>
          • {line.replace(/^- /, "")}
        </Text>
      );
    } else if (line.trim() !== "") {
      // Grassetto dentro il paragrafo
      const parts = line.split(/(\*\*[^*]+\*\*)/g);
      elements.push(
        <Text key={idx} style={styles.paragraph}>
          {parts.map((part, partIdx) =>
            part.startsWith("**") && part.endsWith("**") ? (
              <Text key={partIdx} style={styles.bold}>
                {part.slice(2, -2)}
              </Text>
            ) : (
              part
            )
          )}
        </Text>
      );
    }
  });

  return <View>{elements}</View>;
};
