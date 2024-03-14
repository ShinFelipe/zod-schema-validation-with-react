import { Controller, useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { InputField } from "./components/input-field";
import { RadioButtonGroup } from "./components/radio-button-group ";
import { Label } from "./components/label";

const formSchema = z.object({
  nome: z.string().nonempty({ message: "O nome é obrigatório" }),
  email: z.string().email().nonempty({ message: "O email é obrigatório" }),
  sexo: z.string().nonempty({ message: "O campo é obrigatório" }),
  cargo: z.string().nonempty({ message: "Por favor, informe seu cargo...." }),
  atividade: z.array(
    z.object({
      nome: z.string().nonempty({ message: "Por favor, informe o nome da atividade...." }).optional(),
    })
  ),
  EPIs: z.array(
    z.object({
      nome: z.string().nonempty({ message: "Por favor, selecione um EPIs" }),
    })
  ),
  numeroCA: z.array(
    z.object({
      CA: z.coerce.number(),
    })
  ),
});

export type FormSchema = z.infer<typeof formSchema>;

export function App() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      atividade: [{ nome: "" }],
      EPIs: [{ nome: "" }],
      numeroCA: [{ CA: 0 }],
    },
  });

  const { fields: fieldsAtividade, insert: insertAtividade } = useFieldArray({
    control,
    name: "atividade",
  });

  const {
    fields: fieldsEPIs,
    append: appenEPIs,
    remove: removeEPIs,
  } = useFieldArray({
    control,
    name: "EPIs",
  });

  const {
    fields: fieldsCA,
    append: appenCA,
    remove: removeCA,
  } = useFieldArray({
    control,
    name: "numeroCA",
  });

  function submitData(data: FormSchema) {
    console.log(data);
  }

  function handleAddEPIs() {
    appenEPIs([{ nome: "" }]);
    appenCA([{ CA: 0 }]);
  }

  function handleAddActivity() {
    insertAtividade(fieldsAtividade.length, { nome: "" });
  }

  function handleRemoveEPIs(index: number) {
    removeEPIs(index);
    removeCA(index);
  }

  return (
    <div className="flex justify-center items-center w-full h-screen">
      <div className="bg-[#1B3351] p-5 rounded-lg space-y-3">
        <form onSubmit={handleSubmit(submitData)} className="flex flex-col gap-3 w-[650px]">
          <div className="flex justify-between gap-5">
            <div className="flex-1 flex flex-col space-y-3">
              <InputField type="text" id="Nome" labelText="Nome" placeholder="Digite seu nome..." register={register("nome")} />
              {errors.nome && <span className="text-red-500 text-sm font-medium">{errors.nome.message}</span>}

              <InputField type="email" id="Email" labelText="Email" placeholder="exemple@gmail.com" register={register("email")} />
              {errors.email && <span className="text-red-500 text-sm font-medium">{errors.email.message}</span>}
            </div>

            <div className="flex-1 flex flex-col justify-between">
              <RadioButtonGroup label="Sexo" register={register("sexo")} />
              {errors.sexo && <span className="text-red-500 text-sm font-medium mt-3">{errors.sexo.message}</span>}

              <InputField type="text" id="jobs" labelText="Cargo" placeholder="Digite seu cargo...." register={register("cargo")} />
              {errors.cargo && <span className="text-red-500 text-sm font-medium">{errors.cargo.message}</span>}
            </div>
          </div>

          <div className="border border-r-fuchsia-500 border-t-fuchsia-600 border-l-sky-700 border-b-sky-600 p-5 rounded-xl space-y-5">
            {fieldsAtividade.map((field, index) => {
              return (
                <div key={field.id} className="flex flex-col gap-2 mt-2">
                  <Label label="Atividade" htmlFor="atividade" />

                  <select
                    className="bg-[#224064] outline-none p-2 text-zinc-300 text-sm px-2 font-medium form-select
                  focus:ring-2 focus:ring-emerald-400"
                    {...register(`atividade.${index}.nome`)}
                  >
                    <option value="">Selecione uma atividade</option>
                    <option value="Atividade 01">Atividade 01</option>
                    <option value="Atividade 02">Atividade 02</option>
                    <option value="Atividade 03">Atividade 03</option>
                  </select>
                </div>
              );
            })}

            <div className="flex gap-1">
              <div className="flex flex-col flex-1">
                {fieldsEPIs.map((fieldEPIs, index) => {
                  return (
                    <div key={fieldEPIs.id} className="flex flex-col gap-2">
                      <Label label="EPIs" />
                      <Controller
                        name={`EPIs.${index}.nome`}
                        control={control}
                        render={({ field }) => {
                          return (
                            <select
                              value={field.value}
                              className="bg-[#224064] outline-none p-2 text-zinc-300 text-sm px-2 font-medium form-select 
                            focus:ring-2 focus:ring-emerald-400"
                              onChange={(event) => field.onChange(event.target.value)}
                            >
                              <option value="">Selecione um EPIs</option>
                              <option value="Capacete">Capacete</option>
                              <option value="Luvas">Luvas</option>
                              <option value="Botas de segurança">Botas de segurança</option>
                            </select>
                          );
                        }}
                      />
                    </div>
                  );
                })}
              </div>

              <div className="flex flex-col flex-1">
                {fieldsCA.map((CA, index) => {
                  return (
                    <div key={CA.id} className="flex flex-col gap-2">
                      <InputField labelText="Número CA" placeholder="2134" id="CA" type="number" register={register(`numeroCA.${index}.CA`)} />
                    </div>
                  );
                })}
              </div>

              <div className="flex flex-col flex-1">
                {fieldsEPIs.map((_, index) => {
                  console.log(index, fieldsEPIs.length - 1, index === fieldsEPIs.length - 1);
                  return (
                    <div key={index} className="flex ">
                      {index === fieldsEPIs.length - 1 ? (
                        <button
                          type="button"
                          className="bg-emerald-500 flex flex-1 items-center justify-center text-white font-normal text-sm rounded-md 
                            hover:bg-emerald-600 transition-colors h-10 mt-[26px]"
                          onClick={handleAddEPIs}
                        >
                          Adicionar
                        </button>
                      ) : (
                        <button
                          type="button"
                          className="bg-red-500 flex flex-1 items-center justify-center text-white font-normal text-sm rounded-md 
                            hover:bg-red-600 transition-colors h-10 mt-[26px]"
                          onClick={() => handleRemoveEPIs(index)}
                        >
                          Excluir
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="w-full flex items-center justify-center">
            <button
              type="button"
              className="bg-emerald-500 flex flex-1 items-center justify-center text-white font-normal text-sm rounded-md 
              hover:bg-emerald-600 transition-colors h-10 mt-[26px]"
              onClick={handleAddActivity}
            >
              Adicionar Atividade
            </button>
          </div>

          <button type="submit" className="text-white text-sm font-semibold bg-slate-600 w-full h-10 hover:bg-slate-700 transition-colors rounded-lg">
            Enviar
          </button>
        </form>
      </div>
    </div>
  );
}
