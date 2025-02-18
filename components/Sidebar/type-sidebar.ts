type CommonHeaderDataProps = {
  title: string;
  subtitle?: string;
  iconUrl: string;
};

type ButtonHeaderDataProps = CommonHeaderDataProps & {
  type: "button";
  url?: never; // `url` interdit pour les boutons
};

type LinkHeaderDataProps = CommonHeaderDataProps & {
  type: "link";
  url: string; // `url` obligatoire pour les liens
};

export type HeaderDataProps = ButtonHeaderDataProps | LinkHeaderDataProps;
