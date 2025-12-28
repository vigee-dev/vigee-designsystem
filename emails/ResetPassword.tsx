import { Body, Container, Head, Html, Preview, Link } from "@react-email/components";
import * as React from "react";

import { main, container } from "./style";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { primary } from "./data";
import { button } from "./style";

interface Props {
  link: string;
}

export const ResetPassword = ({ link }: Props) => (
  <Html>
    <Head />
    <Preview>Mot de passe oublié</Preview>
    <Body style={main}>
      <Container style={container}>
        <Header title="Mot de passe oublié" subtitle="Veuillez cliquer sur le bouton ci-dessous pour réinitialiser votre mot de passe." />

        <Link style={{ ...button, backgroundColor: primary, textAlign: "center" }} href={link}>
          Réinitialiser mon mot de passe
        </Link>

        <Footer />
      </Container>
    </Body>
  </Html>
);

export default ResetPassword;
