import { useQuery, UseQueryOptions, UseQueryResult } from "react-query";
import { api } from "../api";

export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  created_at: string;
};

type GetUsersResponse = {
  users: User[];
  totalCount: number;
};

type QueryUser = {
  users: User[];
};

export async function getUsers(page: number): Promise<GetUsersResponse> {
  const { data, headers } = await api.get<QueryUser>("/users", {
    params: {
      page,
    },
  });

  const totalCount = Number(headers["x-total-count"]);

  const users = data.users.map((user) => {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
      created_at: new Date(user.created_at).toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }),
    };
  });

  return { users, totalCount };
}

export function useUsers(page: number, options: UseQueryOptions) {
  return useQuery(["users", page], () => getUsers(page), {
    staleTime: 1000 * 60 * 10,
    ...options,
  }) as UseQueryResult<GetUsersResponse, unknown>;
}
