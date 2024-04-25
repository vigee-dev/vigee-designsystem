import { z } from 'zod';

// VERIFICATION DU NUMERO DE SECU
const ssnSchema = z.string().regex(/^(1|2|7|8)\d{2}(0[1-9]|1[0-2]|[5-9]\d)\d{2}(2[AB]|[0-9]\d|99)\d{3}\d{3}(\d{2})$/, "Numéro de sécurité sociale français invalide");


