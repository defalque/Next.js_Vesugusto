import {
  Body,
  Button,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";

const baseUrl = "https://nextjs-vesugusto.vercel.app/";

const styles = {
  main: {
    backgroundColor: "#ffffff",
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif',
    padding: "40px 24px",
  },
  logo: {
    margin: "0 auto 24px",
    display: "block",
  },
  heading: {
    fontSize: "32px",
    lineHeight: "1.3",
    fontWeight: "700",
    textAlign: "center",
    color: "#fa5252",
    marginBottom: "34px",
  },
  subHeading: {
    fontSize: "20px",
    fontWeight: "600",
    textAlign: "center",
    marginBottom: "24px",
  },
  paragraph: {
    fontSize: "16px",
    lineHeight: "1.6",
    marginBottom: "24px",
    textAlign: "left",
  },
  tableWrapper: {
    border: "1px solid #e5e5e5",
    borderRadius: "8px",
    padding: "16px",
    marginBottom: "24px",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    fontSize: "14px",
  },
  th: {
    textAlign: "left",
    padding: "8px",
    borderBottom: "1px solid #e5e5e5",
    fontWeight: "600",
  },
  td: {
    padding: "12px 8px",
    borderBottom: "1px solid #f0f0f0",
    verticalAlign: "middle",
  },
  productImg: {
    borderRadius: "6px",
    display: "block",
    maxWidth: "80px",
  },
  total: {
    fontWeight: "700",
    textAlign: "right",
    marginTop: "16px",
    fontSize: "16px",
  },
  btnContainer: {
    textAlign: "center",
  },
  button: {
    backgroundColor: "#fa5252",
    borderRadius: "3px",
    color: "#fff",
    fontSize: "16px",
    textDecoration: "none",
    textAlign: "center",
    display: "block",
    padding: "12px",
  },
  hr: {
    borderColor: "#cccccc",
    margin: "20px 0",
  },
  footer: {
    color: "#8898aa",
    fontSize: "12px",
  },
};

export default function ConfirmedOrderEmail({
  id,
  username,
  items,
  total,
  invoiceUrl,
}) {
  return (
    <Html>
      <Head />
      <Preview>
        Abbiamo ricevuto il tuo ordine. Ti invieremo una notifica appena sarà
        spedito.
      </Preview>
      <Body style={styles.main}>
        <Img
          src={`${process.env.NEXT_PUBLIC_PROD_URL}/vesugusto.png`}
          width="150"
          alt="Vesugusto Logo"
          style={styles.logo}
        />

        <Heading style={styles.heading}>Presto a casa tua</Heading>
        <Heading as="h2" style={styles.subHeading}>
          Grazie per il tuo ordine, {username}!
        </Heading>

        <Text style={styles.paragraph}>
          Il tuo acquisto è stato confermato con successo e arriverà presto a
          destinazione. L’importo è stato addebitato sul metodo di pagamento
          selezionato e la fattura del tuo ordine è disponibile qui:{" "}
          <Link href={invoiceUrl}>Scarica la fattura in PDF</Link>. Di seguito
          trovi il riepilogo del tuo ordine:
        </Text>

        <Section style={styles.tableWrapper}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Prodotto</th>
                <th style={styles.th}>Quantità</th>
                <th style={styles.th}>Prezzo</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id}>
                  <td style={styles.td}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                      }}
                    >
                      <Img
                        src={item.image}
                        alt={item.name}
                        width="70"
                        height="100"
                        style={styles.productImg}
                      />
                      <span>{item.name}</span>
                    </div>
                  </td>
                  <td style={styles.td} align="center">
                    {item.quantity}
                  </td>
                  <td style={styles.td} align="right">
                    {item.price}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <Text style={styles.total}>Totale: {total}</Text>
        </Section>
        <Text style={styles.paragraph}>
          Vuoi controllare lo stato del tuo ordine o rivedere i dettagli? Clicca
          sul pulsante qui sotto per visualizzarlo direttamente sul nostro sito:
        </Text>
        <Section style={styles.btnContainer}>
          <Button
            style={styles.button}
            href={`${process.env.NEXT_PUBLIC_PROD_URL}/account/orders/${id}`}
          >
            Vai al tuo ordine
          </Button>
        </Section>
        <Hr style={styles.hr} />
        <Text style={styles.footer}>
          Ricevi questa email perché hai effettuato un ordine sul nostro sito.
          <br /> Non rispondere a questa email! Per qualsiasi domanda o
          assistenza, contatta il nostro{" "}
          <Link
            href={`${process.env.NEXT_PUBLIC_PROD_URL}/account/customer-service`}
          >
            servizio clienti.
          </Link>
          <br />© {new Date().getFullYear()} Vesugusto. Tutti i diritti
          riservati.
        </Text>
      </Body>
    </Html>
  );
}
