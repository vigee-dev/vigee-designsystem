import { Container, Img, Link, Text } from "@react-email/components";
import { contactLink, imageLink, primary, website } from "../data";
import { container, footer, link, text } from "../style";

interface Props {
  content?: string;
  data?: { primary: string; website: string; baseUrl: string; imageLink: string; contactLink: string; webLink: string; slogan: string; imageWidth?: string; imageHeight?: string, marginLeft?: string, marginBottom?: string };
}

export default function Footer({ content, data }: Props) {

  const width = data?.imageWidth ? String(Math.round(Number(data.imageWidth) / 2)) : "80";
const height = data?.imageHeight ? String(Math.round(Number(data.imageHeight) / 2)) : "80";


  return (
    <Container style={container}>
      <Text style={{ ...text, margin: "24px 0" }}>
        {"Si vous avez une question, n'hésitez pas à"}{" "}
        <Link href={data?.contactLink || contactLink} target="_blank" style={{ ...link, color: data?.primary || primary, fontWeight: "bold" }}>
          nous contacter
        </Link>{" "}
        directement. {content}
      </Text>
      <Img src={data?.imageLink || imageLink} width={width} height={height} alt="Logo" style={{ marginLeft: data?.marginLeft || "-20px", marginBottom:  "5px" }} />
      <Link href={data?.website || website} target="_blank" style={{ ...link, color: data?.primary || primary, fontWeight: "bold" }}>
        {data?.website || website}
      </Link>
      <Text style={footer}>{data?.slogan || "Make IT Simple"}</Text>
    </Container>
  );
}
