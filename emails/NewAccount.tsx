import { Body, Container, Head, Html, Preview, Text } from "@react-email/components";
import * as React from "react";
import { main, container, code } from "./style";
import Header from "./components/Header";
import ClientSpace from "./components/ClientSpace";
import Footer from "./components/Footer";

export const NewAccount = ({ btnUrlAction, password }: { btnUrlAction: string; password: string }) => (
  <Html>
    <Head />
    <Preview>Votre compte a bien été créé</Preview>
    <Body style={main}>
      <Container style={container}>
        <Header title="Bienvenue!" subtitle="Votre compte a bien été créé." />
        <Text>Votre mot de passe est le suivant : </Text>
        <code style={code}>{password}</code>
        <ClientSpace title="Vous pouvez dès à présent vous connecter à l'application." btnUrlAction={btnUrlAction} />
        <Footer />
      </Container>
    </Body>
  </Html>
);

export default NewAccount;
