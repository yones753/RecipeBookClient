import React from 'react';
import { Button } from 'primereact/button';
import {hasPermission} from "../../utils/authUtil"

const DeleteRecipeButton = (rowData, handleDeleteRecipe) => (
  <React.Fragment className="m-3">
    <Button
      icon="pi pi-trash"
      className="p-button-rounded p-button-danger"
      tooltipOptions={{ showOnDisabled: true, position: "top" }}
      onClick={() => handleDeleteRecipe(rowData)}
      disabled={!hasPermission("ADMIN")}
    />
  </React.Fragment>
);

export default DeleteRecipeButton;
