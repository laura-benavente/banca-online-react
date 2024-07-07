import { AppLayout } from "@/layouts";
import React from "react";
import { useParams } from "react-router-dom";
import { MovementListTableComponent } from "../movement-list/components/movement-list-table.component";
import { MovementVm } from "../movement-list/movement-list.vm";
import { getAccount, getMovements } from "../movement-list/api";
import { mapMovementListFromApiToVm } from "../movement-list/movement-list.mapper";
import classes from "./movement-list.module.css";
import { Account } from "../account-list/api";

export const MovementListPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [movementList, setMovementList] = React.useState<MovementVm[]>([]);
  const [selectedAccount, setSelectedAccount] = React.useState<Account>();

  React.useEffect(() => {
    getSelectedAccount();
  }, []);

  React.useEffect(() => {
    if(selectedAccount) {
      const defaultAccountId = selectedAccount.id
      getMovementList(id || defaultAccountId);
    }
  }, [selectedAccount]);


  function getSelectedAccount() {
    if(id) {
      getAccount(id).then((result) => {
        if(result.length) {
          setSelectedAccount(result[0])
        }
      }
      );
    }
  }

  function getMovementList(id: string) {
    getMovements(id).then((result) => {
      const movementListToVM = mapMovementListFromApiToVm(result)
      setMovementList(movementListToVM)
    })
  }


  return (
    <AppLayout>
      <div className={classes.root}>
        <div className={classes.headerContainer}>
          <h1>Saldos y Últimos movimientos</h1>
          <div>
            <p className={classes.balanceDesc}>SALDO DISPONIBLE</p>
            <p className={classes.balanceValue}>{selectedAccount?.balance} €</p>
          </div>
        </div>
        <div className={classes.accountData}>
          <p >Alias: {selectedAccount?.name}</p>
          <p>IBAN: {selectedAccount?.iban} </p>
        </div>
        <MovementListTableComponent movementList={movementList} />
      </div>
    </AppLayout>
  );
};
