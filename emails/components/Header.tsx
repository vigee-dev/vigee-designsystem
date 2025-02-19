import React from "react";
import { Body, Container, Head, Heading, Html, Img, Link, Preview, Text, Section, Button } from "@react-email/components";
import { primary, website, imageLink, contactLink } from "../data";
import { main, container, h1, h2, text, code, footer, link, codeNoPadding, button } from "../style";

interface HeaderProps {
  title: string;
  subtitle: string;
}

export default function Header({ title, subtitle }: HeaderProps) {
  return (
    <Container style={container}>
      <Heading style={{ ...h1, color: primary }}>
        <Img src={imageLink} width="122" height="122" alt="Vigee Flow" style={{ marginLeft: "-20px" }} />
        {title}
      </Heading>
      <Text style={{ ...text, margin: "0px 0 20px 0" }}>{subtitle}</Text>
    </Container>
  );
}
