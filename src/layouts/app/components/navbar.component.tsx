import React from "react";
import { Link, generatePath } from "react-router-dom";
import { appRoutes, routesPrefixes } from "@/core/router";
import classes from "./navbar.component.module.css";
import { useLocation } from "react-router-dom";
import { getAccountList } from "@/pages/account-list/api";

export const NavbarComponent: React.FC = () => {
  const { pathname } = useLocation();
  const [defaultAccountId, setDefaultAccountId] = React.useState<
    string | undefined
  >();

  React.useEffect(() => {
    getAccountsList();
  }, []);

  function getAccountsList() {
    getAccountList().then((result) => {
      const accountList = result;
      if (accountList.length) {
        const defaultAccountId = accountList[0].id;
        setDefaultAccountId(defaultAccountId);
      }
    });
  }

  function renderMovementsLink() {
    if (defaultAccountId) {
      return (
        <li
          className={
            pathname.startsWith(routesPrefixes.movements)
              ? classes.selected
              : ""
          }
        >
          <Link
            to={generatePath(appRoutes.movements, {
              id: defaultAccountId,
            })}
          >
            Movimientos
          </Link>
        </li>
      );
    } else {
      return null;
    }
  }

  return (
    <nav className={classes.navbar}>
      <ul className={classes.list}>
        <li
          className={
            pathname.startsWith(routesPrefixes.accountList)
              ? classes.selected
              : ""
          }
        >
          <Link to={appRoutes.accountList}>Mis Cuentas</Link>
        </li>

        {renderMovementsLink()}
      
        <li
          className={
            pathname.startsWith(routesPrefixes.transfer) ? classes.selected : ""
          }
        >
          <Link to={appRoutes.transfer}>Transferencias</Link>
        </li>
      </ul>
    </nav>
  );
};
