import Axios from "axios";
import { Movement } from "./movement-list.api-model";
import { Account } from "@/pages/account-list/api";

const urlMovements = `${import.meta.env.VITE_BASE_API_URL}/movements`;
const urlAccounts = `${import.meta.env.VITE_BASE_API_URL}/account-list`;

export const getMovements = (accountId: string): Promise<Movement[]> =>
  Axios.get<Movement[]>(urlMovements, { params: { accountId } }).then(
    ({ data }) => data
  );

  export const getAccount = (id: string): Promise<Account[]> =>
    Axios.get<Account[]>(urlAccounts, { params: { id } }).then(
      ({ data }) => data
    );