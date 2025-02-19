import { Container, Img, Link, Text } from "@react-email/components";
import { primary, website, imageLink, contactLink } from "../data";
import { container, text, footer, link } from "../style";

interface Props {
  content?: string;
}

export default function Footer({ content }: Props) {
  return (
    <Container style={container}>
      <Text style={{ ...text, margin: "24px 0" }}>
        {"Si vous avez une question, n'hésitez pas à"}{" "}
        <Link href={contactLink} target="_blank" style={{ ...link, color: primary, fontWeight: "bold" }}>
          nous contacter
        </Link>{" "}
        directement. {content}
      </Text>
      <Img src={imageLink} width="80" height="80" alt="Vigee Flow" style={{ marginLeft: "-20px" }} />
      <Link href={website} target="_blank" style={{ ...link, color: primary, fontWeight: "bold" }}>
        vigee.app
      </Link>
      <Text style={footer}>{"Make IT Simple"}</Text>
    </Container>
  );
}
