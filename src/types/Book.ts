import { z } from "zod";

type CommonBook = { //tronc commun aux autres types
  title: string;
  serie: string;
  volume: number;
  author: string;
  category: string;
  summary: string;
  type: string;
  returned: boolean;
  lent: boolean;
  borrower: string;
};

export type Book = CommonBook & { // type pour récupérer le livre de la db
  _id: string;
  finished: boolean;
  opinion: number;
};

export type FormBook = CommonBook & { // type pour le formulaire
  opinion?: number;
};


export const BookSchema = z.object({ // schema zod pour envoyer le formulaire à la db
  title: z.string().min(1), // le min(1) signifie qu'il doit y avoir au moins un caractère
  serie: z.string().optional(),
  volume: z.number().min(1),
  author: z.string().min(1),
  category: z.string().min(1),
  summary: z.string().min(1),
  type: z.string().min(1),
  returned: z.boolean(),
  lent: z.boolean(),
  borrower: z.string().optional(),
  opinion: z.coerce.number().min(1), //le coerce signifie que l'opinion doit être un nombre
}).strict(); // le strict signifie que les types doivent être strictement identiques

export type CreateBook = z.infer<typeof BookSchema>; //type qui utilise le schema zod 