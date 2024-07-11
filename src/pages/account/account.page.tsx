import React, { useState } from "react";
import { AppLayout } from "../../layouts";
import classes from "./account.page.module.css";
import {
  AccountformErrors,
  createEmptyAccount,
  createEmptyAccountFormErrors,
} from "./account.vm";
import { Account, saveAccount } from "./api";
import { validateForm } from "./account.validation";
import { useNavigate } from "react-router-dom";
import { routesPrefixes } from "../../core/router";

export const AccountPage: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<Account>(createEmptyAccount());
  const [errors, setErrors] = React.useState<AccountformErrors>(
    createEmptyAccountFormErrors()
  );

  function handleFormFieldChange(event: React.ChangeEvent<any>) {
    const name = event?.target?.name;
    const value = event?.target?.value;

    setFormData({
      ...formData,
      [name]: value,
    });
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationResult = validateForm(formData);
    setErrors(validationResult.errors);
    if (validationResult.succeeded) {
      saveAccount(formData).then((result) => {
        if (result) {
          navigate(routesPrefixes.accountList);
        }
      });
    }
  };

  return (
    <AppLayout>
      <div className={classes.root}>
        <div className={classes.headerContainer}>
          <h1>Cuenta Bancaria</h1>
        </div>
        <form onSubmit={handleSubmit} className={classes.form}>
          <div>
            <select
              className={`${classes.select} ${
                errors.type ? classes.inputError : ""
              }`}
              name="type"
              onChange={handleFormFieldChange}
            >
              <option value={undefined}>Seleccionar</option>
              <option value={"corriente"}>Cuenta Corriente</option>
              <option value={"ahorro"}>Cuenta ahorro</option>
            </select>
            {errors.type && <p className={classes.error}>{errors.type}</p>}
          </div>
          <div>
            <input
              type="text"
              name="name"
              onChange={handleFormFieldChange}
              className={errors.name ? classes.inputError : ""}
            />
            {errors.name && <p className={classes.error}>{errors.name}</p>}
          </div>
          <div className={classes.btnEnviarContainer}>
            <button type="submit" className={classes.btnEnviar}>
              GUARDAR
            </button>
          </div>
        </form>
      </div>
    </AppLayout>
  );
};
