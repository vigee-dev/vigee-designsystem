import { Container, Img, Link, Text } from "@react-email/components";
import { primary, website, imageLink, contactLink } from "../data";
import { container, text, footer, link } from "../style";

interface Props {
  content?: string;
  data?: { primary: string; website: string; baseUrl: string; imageLink: string; contactLink: string; webLink: string; slogan: string };
}

export default function Footer({ content, data }: Props) {
  return (
    <Container style={container}>
      <Text style={{ ...text, margin: "24px 0" }}>
        {"Si vous avez une question, n'hésitez pas à"}{" "}
        <Link href={data?.contactLink || contactLink} target="_blank" style={{ ...link, color: data?.primary || primary, fontWeight: "bold" }}>
          nous contacter
        </Link>{" "}
        directement. {content}
      </Text>
      <Img src={data?.imageLink || imageLink} width="80" height="80" alt="Vigee Flow" style={{ marginLeft: "-20px" }} />
      <Link href={data?.website || website} target="_blank" style={{ ...link, color: data?.primary || primary, fontWeight: "bold" }}>
        {data?.website || website}
      </Link>
      <Text style={footer}>{data?.slogan || "Make IT Simple"}</Text>
    </Container>
  );
}
