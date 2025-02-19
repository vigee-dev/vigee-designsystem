import { Body, Container, Head, Html, Preview, Section, Button } from "@react-email/components";

import * as React from "react";
import { main, container, button } from "./style";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { primary } from "./data";

export const VerificationEmail = ({ btnUrlAction }: { btnUrlAction: string }) => (
  <Html>
    <Head />
    <Preview>Connexion</Preview>
    <Body style={main}>
      <Container style={container}>
        <Header title="Connexion" subtitle="Connectez-vous à Vigee Flow en cliquant sur le bouton ci-dessous." />
        <Section className="flex mx-auto justify-center">
          <Button style={{ ...button, backgroundColor: primary, textAlign: "center" }} href={btnUrlAction}>
            Connexion
          </Button>
        </Section>
        <Footer />
      </Container>
    </Body>
  </Html>
);
