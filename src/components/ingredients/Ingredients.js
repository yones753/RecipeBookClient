import React, { useState, useEffect, useRef } from "react";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import Table from "../shared/Table";
import IngredientsForm from "./IngredientsForm"
import { getIngredientsPriceList, deleteIngredient } from "../../services/ingredientService"
import { useFetchWithAuth } from "../../utils/useFetchWithAuth";

const Ingredients = () => {

    const [openAddDialog, setOpenAddDialog] = useState(false);
    const [openEditDialog, setOpenEditDialog] = useState(false);
    const toast = useRef(null);
    const [ingredients, setIngredients] = useState([]);
    const [ingredient, setIngredient] = useState([]);
    const fetchWithAuth = useFetchWithAuth();

    const toggleAddActionDialog = () => {
        setOpenAddDialog(!openAddDialog);
    };
    const toggleEditActionDialog = (rowData) => {
        setIngredient(rowData)
        setOpenEditDialog(!openEditDialog);
    };

    const handleDeleteAction = async (rowData) => {
        try {
            const res = await deleteIngredient(fetchWithAuth, rowData.id)
            if (res) {
                getIngredients()
                displayToast("success",
                    "Ingredient Deleted",
                    res.name)
            }
        } catch (error) {
            displayToast("error",
                "Failed to deleted ingredient",
                error.message)
        }

    }

    const getIngredients = async () => {
        try {
            const resp = await getIngredientsPriceList(fetchWithAuth);
            setIngredients(resp);
        } catch (error) {
            displayToast("error",
                "Failed to fetch ingredients",
                error.message)
        }
    };

    useEffect(() => {
        getIngredients()
    }, []);

    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <Button
                    icon="pi pi-pencil"
                    className="p-button-rounded p-button-secondary mr-2"
                    tooltipOptions={{ showOnDisabled: true, position: "top" }}
                    onClick={() => toggleEditActionDialog(rowData)}
                />
                <Button
                    icon="pi pi-trash"
                    className="p-button-rounded p-button-danger"
                    tooltipOptions={{ showOnDisabled: true, position: "top" }}
                    onClick={() => handleDeleteAction(rowData)}
                />
            </React.Fragment>
        );
    };

    const columns = [
        {
            field: "id",
            header: "ID",
            body: (rowData) => rowData.id,
            sortable: true,
        },
        {
            field: "name",
            header: "Name",
            body: (rowData) => rowData.name,
            sortable: true,
        },
        {
            field: "price",
            header: "Price",
            body: (rowData) => rowData.price,
            sortable: true,
        },
        { field: "actions", header: "Actions", body: actionBodyTemplate },
    ];

    const actionButtons = (
        <>
            <Button
                label="Add New Ingredient"
                icon="pi pi-plus"
                onClick={toggleAddActionDialog}
                className="p-button-sm"
                tooltipOptions={{ showOnDisabled: true, position: "bottom" }}
            />
        </>
    );

    const displayToast = (severity, summary, detail) => {
        toast.current.show({
            severity: severity,
            summary: summary,
            detail: detail,
        });
    };

    return (<div> <Table
        tableName={"Ingredients"}
        actionButtons={actionButtons}
        data={ingredients}
        columns={columns}
        paginator
        rows={8}
        removableSort={false}
        sortField={"id"}
    />
        <Toast ref={toast} />
        {openAddDialog ? <IngredientsForm displayToast={displayToast} getIngredients={getIngredients} openAddDialog={openAddDialog} hideDialog={toggleAddActionDialog} ingredients={[]} /> : <IngredientsForm displayToast={displayToast} getIngredients={getIngredients} openEditDialog={openEditDialog} hideDialog={toggleEditActionDialog} ingredient={ingredient} />}</div>);
}

export default Ingredients;