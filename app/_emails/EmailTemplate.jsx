import {
  Body,
  Button,
  Column,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Text,
} from "@react-email/components";

const baseUrl = "http://localhost:3000";

export const WelcomeEmail = ({ username }) => (
  <Html>
    <Head />
    <Body style={main}>
      <Preview>Grazie per esserti unito a noi!</Preview>
      <Container style={container}>
        <Img
          src={`${process.env.NEXT_PUBLIC_PROD_URL}/vesugusto.png`}
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
          <Button
            style={button}
            href={`${process.env.NEXT_PUBLIC_PROD_URL}/shop`}
          >
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

export const OrderReceiptEmail = ({ username }) => (
  <Html>
    <Head />
    <Body style={orderMain}>
      <Preview>
        Get your order summary, estimated delivery date and more
      </Preview>
      <Container style={orderContainer}>
        <Section style={track.container}>
          <Row>
            <Column>
              <Text style={global.paragraphWithBold}>Tracking Number</Text>
              <Text style={track.number}>1ZV218970300071628</Text>
            </Column>
            <Column align="right">
              <Link style={global.button}>Track Package</Link>
            </Column>
          </Row>
        </Section>
        <Hr style={global.hr} />
        <Section style={message}>
          <Img
            src={`${baseUrl}/vesugusto.png`}
            width="120"
            height="120"
            alt="Vesugusto"
            style={{ margin: "auto" }}
          />
          <Heading style={global.heading}>Presto a casa tua.</Heading>
          <Text style={global.text}>
            You order's is on its way. Use the link above to track its progress.
          </Text>
          <Text style={{ ...global.text, marginTop: 24 }}>
            We´ve also charged your payment method for the cost of your order
            and will be removing any authorization holds. For payment details,
            please visit your Orders page on Nike.com or in the Nike app.
          </Text>
        </Section>
        <Hr style={global.hr} />
        <Section style={global.defaultPadding}>
          <Text style={adressTitle}>Shipping to: {username}</Text>
          <Text style={{ ...global.text, fontSize: 14 }}>
            2125 Chestnut St, San Francisco, CA 94123
          </Text>
        </Section>
        <Hr style={global.hr} />
        <Section
          style={{ ...paddingX, paddingTop: "40px", paddingBottom: "40px" }}
        >
          <Row>
            <Column>
              <Img
                src={`${baseUrl}/vesugusto.png`}
                alt="Brazil 2022/23 Stadium Away Women's Nike Dri-FIT Soccer Jersey"
                style={{ float: "left" }}
                width="260px"
              />
            </Column>
            <Column style={{ verticalAlign: "top", paddingLeft: "12px" }}>
              <Text style={{ ...orderParagraph, fontWeight: "500" }}>
                Brazil 2022/23 Stadium Away Women's Nike Dri-FIT Soccer Jersey
              </Text>
              <Text style={global.text}>Size L (12–14)</Text>
            </Column>
          </Row>
        </Section>
        <Hr style={global.hr} />
        <Section style={global.defaultPadding}>
          <Row style={{ display: "inline-flex", marginBottom: 40 }}>
            <Column style={{ width: "170px" }}>
              <Text style={global.paragraphWithBold}>Order Number</Text>
              <Text style={track.number}>C0106373851</Text>
            </Column>
            <Column>
              <Text style={global.paragraphWithBold}>Order Date</Text>
              <Text style={track.number}>Sep 22, 2022</Text>
            </Column>
          </Row>
          <Row>
            <Column align="center">
              <Link style={global.button}>Order Status</Link>
            </Column>
          </Row>
        </Section>
        <Hr style={global.hr} />
        <Section style={paddingY}>
          <Row>
            <Text style={global.heading}>Vesugusto.com</Text>
          </Row>
          <Row style={categories.container}>
            <Column align="center">
              <Link href="https://www.nike.com/" style={categories.text}>
                Home
              </Link>
            </Column>
            <Column align="center">
              <Link href="https://www.nike.com/" style={categories.text}>
                Shop
              </Link>
            </Column>
          </Row>
        </Section>
        <Hr style={{ ...global.hr, marginTop: "12px" }} />
        <Section style={paddingY}>
          <Row style={orderFooter.policy}>
            <Column>
              <Text style={orderFooter.text}>Web Version</Text>
            </Column>
            <Column>
              <Text style={orderFooter.text}>Privacy Policy</Text>
            </Column>
          </Row>
          <Row>
            <Text
              style={{ ...orderFooter.text, paddingTop: 30, paddingBottom: 30 }}
            >
              Please contact us if you have any questions. (If you reply to this
              email, we won't be able to see it.)
            </Text>
          </Row>
          <Row>
            <Text style={orderFooter.text}>
              © 2022 Vesugusto, Inc. All Rights Reserved.
            </Text>
          </Row>
        </Section>
      </Container>
    </Body>
  </Html>
);

const paddingX = {
  paddingLeft: "40px",
  paddingRight: "40px",
};

const paddingY = {
  paddingTop: "22px",
  paddingBottom: "22px",
};

const orderParagraph = {
  margin: "0",
  lineHeight: "2",
};

const global = {
  paddingX,
  paddingY,
  defaultPadding: {
    ...paddingX,
    ...paddingY,
  },
  paragraphWithBold: { ...orderParagraph, fontWeight: "bold" },
  heading: {
    fontSize: "32px",
    lineHeight: "1.3",
    fontWeight: "700",
    textAlign: "center",
    letterSpacing: "-1px",
    color: "#fa5252",
  },
  text: {
    ...orderParagraph,
    color: "#747474",
    fontWeight: "500",
  },
  button: {
    border: "1px solid #929292",
    fontSize: "16px",
    textDecoration: "none",
    padding: "10px 0px",
    width: "220px",
    display: "block",
    textAlign: "center",
    fontWeight: 500,
    color: "#000",
  },
  hr: {
    borderColor: "#E5E5E5",
    margin: "0",
  },
};

const orderMain = {
  backgroundColor: "#ffffff",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const orderContainer = {
  margin: "10px auto",
  width: "600px",
  maxWidth: "100%",
  border: "1px solid #E5E5E5",
};

const track = {
  container: {
    padding: "22px 40px",
    backgroundColor: "#F7F7F7",
  },
  number: {
    margin: "12px 0 0 0",
    fontWeight: 500,
    lineHeight: "1.4",
    color: "#6F6F6F",
  },
};

const message = {
  padding: "40px 74px",
  textAlign: "center",
};

const adressTitle = {
  ...orderParagraph,
  fontSize: "15px",
  fontWeight: "bold",
};

const categories = {
  container: {
    width: "370px",
    margin: "auto",
    paddingTop: "12px",
  },
  text: {
    fontWeight: "500",
    color: "#000",
  },
};

const orderFooter = {
  policy: {
    width: "166px",
    margin: "auto",
  },
  text: {
    margin: "0",
    color: "#AFAFAF",
    fontSize: "13px",
    textAlign: "center",
  },
};

export const ConfirmedOrderEmail = ({ username, items, total }) => (
  <Section className="py-[16px] text-center">
    <Heading as="h1" className="mb-0 text-[30px] leading-[36px] font-semibold">
      Grazie per l'acquisto, {username}!
    </Heading>
    <Section className="my-[16px] rounded-[8px] border border-solid border-gray-200 p-[16px] pt-0">
      <table className="mb-[16px]" width="100%">
        <thead>
          <tr>
            <th>&nbsp;</th>
            <th colSpan={6}>Prodotto</th>
            <th>Quantità</th>
            <th>Prezzo</th>
          </tr>
        </thead>
        <tbody>
          {items.map((product) => (
            <tr key={product.id}>
              <td>
                <Img
                  alt={`Immagine di ${product.name}`}
                  src={product.image}
                  height={110}
                  className="rounded-[8px] object-cover"
                />
              </td>
              <td colSpan={6} align="center">
                <Text>{product.name}</Text>
              </td>
              <td align="center">
                <Text>{product.quantity}</Text>
              </td>
              <td align="center">
                <Text>{product.price}</Text>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Text className="mt-4 text-right font-bold">Totale: {total}</Text>
    </Section>
  </Section>
);
