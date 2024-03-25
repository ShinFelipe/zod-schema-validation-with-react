import { z } from "zod";

export const atividadesSchema = z.object({
  nome: z.string().nonempty({ message: "Por favor, informe o nome da atividade...." }),
  EPIs: z.array(
    z.object({
      nome: z.string().nonempty({ message: "Por favor, selecione um EPIs" }),
    })
  ),
  CA: z.array(
    z.object({
      CA: z.coerce.number().min(7, { message: "Por favor, digite o número de CA" }),
    })
  ),
});

export const formSchema = z.object({
  nome: z.string().nonempty({ message: "O nome é obrigatório...." }),
  email: z
    .string()
    .email({ message: "O email é obrigatório...." })
    .nonempty({ message: "O email é obrigatório...." }),
  sexo: z
    .string({ invalid_type_error: "O campo é obrigatório...." })
    .nonempty({ message: "O campo é obrigatório...." }),
  cargo: z.string().nonempty({ message: "Por favor, informe seu cargo...." }),
  atividades: z.array(atividadesSchema),
});

export type FormSchema = z.infer<typeof formSchema>;
