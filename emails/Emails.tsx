import ResetPassword from "./ResetPassword";
import NewAccount from "./NewAccount";
import { VerificationEmail } from "./VerificationEmail";

// Regroupez-les dans un objet
const Emails = {
  NewAccount,
  VerificationEmail,
  ResetPassword,
};

// Exportez l'objet
export default Emails;
