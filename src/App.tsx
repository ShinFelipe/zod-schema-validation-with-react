import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, FormProvider, useFieldArray, useForm } from "react-hook-form";
import { Form } from "./components/form";
import { FormSchema, formSchema } from "./lib/zod-config";
import { activitys, epis } from "./constants";
import { Button } from "./components/button";

export function App() {
  const createForm = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      atividades: [
        {
          nome: "",
          EPIs: [
            {
              nome: "",
            },
          ],
          CA: [
            {
              CA: 0,
            },
          ],
        },
      ],
    },
  });

  const {
    control,
    getValues,
    setValue,
    handleSubmit,
    formState: { errors },
  } = createForm;

  const { fields, append } = useFieldArray({
    control,
    name: "atividades",
  });

  function handleSubmits(data: FormSchema) {
    console.log("Entrou", data);
  }

  const addEPIAndCA = (activityIndex: number) => {
    const atividadesValues = getValues("atividades");
    const newActivity = { ...atividadesValues[activityIndex] }; // Cria uma cópia da atividade

    // Adiciona um novo objeto aos arrays EPIs e CA
    newActivity.EPIs = [...newActivity.EPIs, { nome: "" }];
    newActivity.CA = [...newActivity.CA, { CA: 0 }];

    // Cria uma nova lista de atividades com a atividade atualizada
    const newAtividadesValues = atividadesValues.map((atividade, index) =>
      index === activityIndex ? newActivity : atividade
    );
    // console.log(newAtividadesValues);
    setValue("atividades", newAtividadesValues);
  };

  const handleRemove = (activityIndex: number, FieldIndex: number) => {
    const currentActivity = getValues("atividades");

    currentActivity[activityIndex].EPIs.splice(FieldIndex, 1);
    currentActivity[activityIndex].CA.splice(FieldIndex, 1);

    setValue("atividades", currentActivity);
  };

  const handleAddNewActivity = () => {
    append([
      {
        nome: "",
        EPIs: [
          {
            nome: "",
          },
        ],
        CA: [
          {
            CA: 0,
          },
        ],
      },
    ]);
  };

  return (
    <div className="flex justify-center items-center w-full h-screen">
      <FormProvider {...createForm}>
        <form
          onSubmit={handleSubmit(handleSubmits)}
          className="bg-[#1B3351] w-[650px] p-5 flex gap-5 flex-col"
        >
          <div className="flex gap-3">
            <Form.Field>
              <Form.Label>Nome</Form.Label>
              <Form.Input name="nome" placeholder="Digite seu nome..." type="text" />

              {errors.nome && (
                <span className="text-xs text-red-400 mt-1 font-medium">{errors.nome.message}</span>
              )}

              <Form.Label>Email</Form.Label>
              <Form.Input name="email" placeholder="Digite seu email..." type="email" />

              {errors.email && (
                <span className="text-xs text-red-400 mt-1 font-medium">{errors.email.message}</span>
              )}
            </Form.Field>

            <Form.Field>
              <Form.Label>Sexo</Form.Label>

              <div className="px-3 h-[42px] space-x-2 -mb-1">
                <Form.Input name="sexo" type="radio" value="Masculino" />
                <Form.Label>Masculino</Form.Label>

                <Form.Input name="sexo" type="radio" value="Feminino" />
                <Form.Label>Feminino</Form.Label>
              </div>

              {errors.sexo && (
                <span className="text-xs text-red-400 mt-1 font-medium">{errors.sexo.message}</span>
              )}

              <Form.Label>Cargo</Form.Label>
              <Form.Input name="cargo" type="text" placeholder="Digite seu cargo...." />
              {errors.cargo && (
                <span className="text-xs text-red-400 mt-1 font-medium">{errors.cargo.message}</span>
              )}
            </Form.Field>
          </div>

          <div className="flex flex-col border border-r-fuchsia-500 border-t-fuchsia-600 border-l-sky-700 border-b-sky-600 p-5 rounded-xl space-y-5">
            {fields.map((field, index) => {
              return (
                <fieldset key={field.id} className="flex flex-col gap-5">
                  <div className="flex flex-col gap-1">
                    <Form.Label>Atividades</Form.Label>

                    <Controller
                      name={`atividades.${index}.nome`}
                      control={control}
                      render={({ field }) => {
                        return (
                          <select
                            className="bg-[#224064] outline-none p-2 text-zinc-300 text-sm px-2 font-medium focus:ring-2 focus:ring-emerald-400"
                            {...field}
                          >
                            {activitys.map((item, index) => {
                              return (
                                <option key={index} value={item.value}>
                                  {item.name}
                                </option>
                              );
                            })}
                          </select>
                        );
                      }}
                    />
                    {errors.atividades && errors.atividades[index]?.nome && (
                      <span className="text-xs text-red-400 mt-1 font-medium">
                        {errors.atividades[index]!.nome!.message}
                      </span>
                    )}
                  </div>

                  <div className="flex gap-5">
                    <div className="flex flex-col flex-1 gap-3">
                      {getValues(`atividades.${index}.EPIs`).map((_, epiIndex) => {
                        return (
                          <div key={epiIndex} className="flex flex-col">
                            {/* EPIs */}
                            <Controller
                              control={control}
                              name={`atividades.${index}.EPIs.${epiIndex}.nome`}
                              render={({ field }) => {
                                return (
                                  <select
                                    className="bg-[#224064] outline-none p-2 text-zinc-300 text-sm px-2 font-medium focus:ring-2 focus:ring-emerald-400"
                                    {...field}
                                  >
                                    {epis.map((item, index) => {
                                      return (
                                        <option key={index} value={item.value}>
                                          {item.name}
                                        </option>
                                      );
                                    })}
                                  </select>
                                );
                              }}
                            />
                            {errors.atividades && errors.atividades[index]?.EPIs && (
                              <span className="text-xs text-red-400 mt-1 font-medium">
                                {errors.atividades[index]!.EPIs![epiIndex]!.nome!.message}
                              </span>
                            )}
                          </div>
                        );
                      })}
                    </div>

                    <div className="flex flex-col flex-1 gap-3">
                      {getValues(`atividades.${index}.CA`).map((_, caIndex) => {
                        return (
                          <div key={caIndex} className="flex flex-col">
                            {/* CA */}
                            <Controller
                              control={control}
                              name={`atividades.${index}.CA.${caIndex}.CA`}
                              render={({ field }) => {
                                return (
                                  <input
                                    className="bg-[#224064] outline-none p-2 text-zinc-300 text-sm px-2 font-medium focus:ring-2 focus:ring-emerald-400 flex-1"
                                    {...field}
                                    type="number"
                                    placeholder="Número do CA"
                                  />
                                );
                              }}
                            />

                            {errors.atividades && errors.atividades[index]?.CA && (
                              <span className="text-xs text-red-400 mt-1 font-medium">
                                {errors.atividades[index]!.CA![caIndex]!.CA!.message}
                              </span>
                            )}
                          </div>
                        );
                      })}
                    </div>

                    <div className="flex flex-col flex-1 gap-3">
                      {getValues(`atividades.${index}.EPIs`).map((_, btnIndex) => {
                        // console.log(btnIndex, getValues(`atividades.${index}.CA`).length - 1);
                        return (
                          <div className="flex flex-col" key={btnIndex}>
                            {btnIndex === getValues(`atividades.${index}.EPIs`).length - 1 ? (
                              <Button
                                className="bg-sky-500 hover:bg-sky-600 transition-colors outline-none p-2 text-zinc-100 text-sm px-2 font-medium focus:ring-2 
                              focus:ring-emerald-400 rounded-lg"
                                type="button"
                                onClick={() => addEPIAndCA(index)}
                              >
                                Adicionar
                              </Button>
                            ) : (
                              <Button
                                className="bg-red-500 hover:bg-red-600 transition-colors outline-none p-2 text-zinc-300 text-sm px-2 font-medium focus:ring-2 
                              focus:ring-emerald-400 rounded-lg"
                                type="button"
                                onClick={() => handleRemove(index, btnIndex)}
                              >
                                Deleter
                              </Button>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </fieldset>
              );
            })}
          </div>

          <Button
            type="button"
            onClick={handleAddNewActivity}
            className="bg-sky-500 hover:bg-sky-600 transition-colors outline-none p-2 text-zinc-100 text-sm px-2 font-medium focus:ring-2 focus:ring-emerald-400 rounded-lg"
          >
            Adicionar atividades
          </Button>

          <Button
            type="submit"
            className="text-white text-sm font-semibold bg-slate-600 w-full h-10 hover:bg-slate-700 transition-colors rounded-lg"
          >
            Enviar
          </Button>
        </form>
      </FormProvider>
    </div>
  );
}
