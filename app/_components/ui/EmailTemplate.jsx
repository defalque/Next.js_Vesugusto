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
} from "@react-email/components";

const baseUrl = "http://localhost:3000";

export const WelcomeEmail = ({ username }) => (
  <Html>
    <Head />
    <Body style={main}>
      <Preview>
        Scopri il meglio dei sapori vesuviani direttamente a casa tua.
      </Preview>
      <Container style={container}>
        <Img
          src={`${baseUrl}/vesugusto.png`}
          width="170"
          height="170"
          alt="Vesugusto"
          style={logo}
        />
        <Heading style={heading}>Ciao {username}, benvenuto!</Heading>
        <Text style={paragraph}>
          Siamo felici che tu ti sia unito a noi! Da oggi potrai scoprire
          centinaia di prodotti selezionati con cura, promozioni esclusive e
          consigli personalizzati.
        </Text>
        <Section style={btnContainer}>
          <Button style={button} href="http://localhost:3000/shop">
            Vai allo shop
          </Button>
        </Section>
        <Hr style={hr} />
        <Text style={footer}>
          Ricevi questa email perché ti sei registrato su vesugusto.com
          <br />© {new Date().getFullYear()} Vesugusto. Tutti i diritti
          riservati.
        </Text>
      </Container>
    </Body>
  </Html>
);

export default WelcomeEmail;

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
