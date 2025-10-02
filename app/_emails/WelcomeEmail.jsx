import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Preview,
  Section,
  Text,
  Link,
} from "@react-email/components";

const baseUrl = "https://nextjs-vesugusto.vercel.app/";

export default function WelcomeEmail({ username = "Marco" }) {
  return (
    <Html>
      <Head />
      <Body style={main}>
        <Preview>
          Vedi il riepilogo del tuo ordine, la data di consegna stimata e altro
          ancora
        </Preview>
        <Container style={container}>
          <Img
            src={`${process.env.NEXT_PUBLIC_PROD_URL}/vesugusto.png`}
            // src={vesugusto}
            width="170"
            height="170"
            alt="Vesugusto"
            style={logo}
          />
          <Heading style={heading}>
            Ciao {username}, benvenuto su Vesugusto!
          </Heading>
          <Text style={paragraph}>
            Siamo felici che tu ti sia unito a noi! Da oggi potrai scoprire
            centinaia di prodotti selezionati con cura, promozioni esclusive e
            consigli personalizzati.
          </Text>
          <Section style={btnContainer}>
            <Button
              style={button}
              href={`${process.env.NEXT_PUBLIC_PROD_URL}/shop`}
            >
              Vai allo shop
            </Button>
          </Section>
          <Hr style={hr} />
          <Text style={footer}>
            Ricevi questa email perché ti sei registrato sul nostro sito.
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
        </Container>
      </Body>
    </Html>
  );
}

const main = {
  backgroundColor: "#ffffff",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: "0 auto",
  padding: "20px 0 48px",
};

const logo = {
  margin: "0 auto",
};

const heading = {
  fontSize: "22px",
  lineHeight: "26px",
};

const paragraph = {
  fontSize: "16px",
  lineHeight: "26px",
};

const btnContainer = {
  textAlign: "center",
};

const button = {
  backgroundColor: "#fa5252",
  borderRadius: "3px",
  color: "#fff",
  fontSize: "16px",
  textDecoration: "none",
  textAlign: "center",
  display: "block",
  padding: "12px",
};

const hr = {
  borderColor: "#cccccc",
  margin: "20px 0",
};

const footer = {
  color: "#8898aa",
  fontSize: "12px",
};
