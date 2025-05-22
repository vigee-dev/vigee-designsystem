import { Body, Button, Container, Head, Html, Preview, Text } from "@react-email/components";
import * as React from "react";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { primary } from "./data";
import { button, code, container, main } from "./style";

type ContentItem = {
  label?: string;
  content: string;
};

type Props = {
  content: string | ContentItem[];
};

const normalizeContent = (content: Props["content"]): ContentItem[] => {
  if (!content) return [];
  if (typeof content === "string") return [{ content }];
  return content;
};

export const Global = ({
  title,
  subtitle,
  btnText,
  btnUrlAction,
  content,
  data,

}: {
  title: string;
  subtitle: string;
  btnText: string;
  btnUrlAction: string;
  content: Props["content"];
  data?: { primary: string; website: string; baseUrl: string; imageLink: string; contactLink: string; webLink: string; slogan: string; imageWidth?: string; imageHeight?: string, marginLeft?: string, marginBottom?: string };
}) => {
  const normalizedContent = normalizeContent(content);

  return (
    <Html>
      <Head />
      <Preview>{title}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Header title={title} subtitle={subtitle} data={data} />

          {normalizedContent.map((item, itemIndex) => (
            <>
              {item.label && <Text style={{ fontWeight: "bold" }}>{item.label}</Text>}
              <code style={code}>
                {item.content.split("\n").map((line, lineIndex) => (
                  <React.Fragment key={lineIndex}>
                    {line}
                    <br />
                  </React.Fragment>
                ))}
              </code>
            </>
          ))}

          {btnText && btnUrlAction && (
            <Button style={{ ...button, backgroundColor: data?.primary || primary, textAlign: "center" }} href={btnUrlAction}>
              {btnText}
            </Button>
          )}
          <Footer data={data} />
        </Container>
      </Body>
    </Html>
  );
};

export default Global;
