import React from "react";
import { Text, Section, Button } from "@react-email/components";
import { primary } from "../data";
import { text, button } from "../style";

interface HeaderProps {
  title: string;
  btnUrlAction: string;
}

export default function ClientSpace({ title, btnUrlAction }: HeaderProps) {
  return (
    <Section className="flex mx-auto justify-center">
      <Text style={{ ...text, margin: "24px 0" }}>{title}</Text>

      <Button
        style={{ ...button, backgroundColor: primary, textAlign: "center" }}
        href={btnUrlAction}
      >
        Espace client
      </Button>
    </Section>
  );
}
