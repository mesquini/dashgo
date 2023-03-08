import { Input } from "@/components/Form/Input";
import { Header } from "@/components/Header";
import { Siderbar } from "@/components/Sidebar";
import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  HStack,
  SimpleGrid,
  VStack,
} from "@chakra-ui/react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler } from "react-hook-form/dist/types";

type CreateFormData = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
};

const createFormSchema = yup.object().shape({
  name: yup.string().required("Nome obrigatório"),
  email: yup.string().required("E-mail obrigatório").email("E-mail inválido"),
  password: yup
    .string()
    .min(6, "Precisa ter 6 caracteres no minimo")
    .required("Senha obrigatório"),
  password_confirmation: yup
    .string()
    .oneOf([undefined, yup.ref("password")], "As senhas precisam ser iguais"),
});

export default function CreateUser() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(createFormSchema),
  });

  const handleCreateUser: SubmitHandler<CreateFormData> = async (data) => {
    console.log(
      "🚀 ~ file: create.tsx:39 ~ consthandleCreateUser:SubmitHandler<>= ~ data:",
      data
    );
  };

  return (
    <Box>
      <Header />

      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
        <Siderbar />

        <Box
          as="form"
          onSubmit={handleSubmit(handleCreateUser)}
          flex="1"
          borderRadius={8}
          bg="gray.800"
          p={["6", "8"]}
        >
          <Heading size="lg" fontWeight={"normal"}>
            Criar usuário
          </Heading>

          <Divider my="6" borderColor={"gray.700"} />

          <VStack spacing={8}>
            <SimpleGrid minChildWidth={"240px"} spacing={["6", "8"]} w="100%">
              <Input
                {...register("name")}
                error={errors?.name}
                name="name"
                label="Nome Completo"
              />
              <Input
                {...register("email")}
                error={errors?.email}
                name="email"
                label="E-mail"
                type="email"
              />
            </SimpleGrid>
            <SimpleGrid minChildWidth={"240px"} spacing={["6", "8"]} w="100%">
              <Input
                {...register("password")}
                error={errors?.password}
                name="password"
                label="Senha"
                type={"password"}
              />
              <Input
                {...register("password_confirmation")}
                error={errors?.password_confirmation}
                name="password_confirmation"
                label="Confirme sua senha"
                type={"password"}
              />
            </SimpleGrid>
          </VStack>

          <Flex mt={["6", "8"]} justify={"flex-end"}>
            <HStack spacing={4}>
              <Link href={"/users"} passHref>
                <Button as="a" colorScheme={"whiteAlpha"}>
                  Cancelar
                </Button>
              </Link>
              <Button
                type="submit"
                colorScheme={"pink"}
                isLoading={isSubmitting}
              >
                Salvar
              </Button>
            </HStack>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
}
