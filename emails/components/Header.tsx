import { Container, Heading, Img, Text } from "@react-email/components";
import { imageLink, primary } from "../data";
import { container, h1, text } from "../style";

interface HeaderProps {
  title: string;
  subtitle: string;
  data?: { primary: string; website: string; baseUrl: string; imageLink: string; contactLink: string; webLink: string; slogan: string; imageWidth?: string; imageHeight?: string, marginBottom?: string, marginLeft?: string };
}

export default function Header({ title, subtitle, data }: HeaderProps) {
  return (
    <Container style={container}>
      <Heading style={{ ...h1, color: data?.primary || primary }}>
        <Img src={data?.imageLink || imageLink} width={data?.imageWidth || "122"} height={data?.imageHeight || "122"} alt="Logo" style={{  marginBottom: data?.marginBottom || "20px", marginLeft: data?.marginLeft || "-20px" }} />
        {title}
      </Heading>
      <Text style={{ ...text, margin: "0px 0 20px 0" }}>{subtitle}</Text>
    </Container>
  );
}
