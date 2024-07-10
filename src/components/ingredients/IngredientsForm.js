import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import React, { useState, useRef, useEffect } from "react";
import FooterDialog from "../modal/FooterDialog"
import { insertIngredient, updatedIngredient } from "../../services/ingredientService"
import { useFetchWithAuth } from "../../utils/useFetchWithAuth";

const IngredientsForm = (props) => {
    const { getIngredients, openAddDialog, hideDialog, ingredient, openEditDialog } = props
    const [ingredientName, setIngredientName] = useState("");
    const [ingredientPrice, setIngredientPrice] = useState(1);
    const fetchWithAuth = useFetchWithAuth();

    useEffect(() => {
        if (ingredient) {
            setIngredientName(ingredient.name)
            setIngredientPrice(ingredient.price)
        }
        else {
            handleClear()
        }
    }, [ingredient]);

    const handleClear = async () => {
        setIngredientName("")
        setIngredientPrice(1)
    }

    const handleUpdatedIngredient = async () => {
        try {
            const res = await updatedIngredient(fetchWithAuth, { name: ingredientName, price: ingredientPrice }, ingredient.id)
            if (res) {
                getIngredients()
                props.displayToast("success",
                    "Ingredient Updated", res.name)
                handleClear()
                return true
            }
        } catch (error) {
            props.displayToast("error",
                "Failed to update ingredient", error.message)
        }
    }

    const handleAddIngredient = async () => {
        try {
            const res = await insertIngredient(fetchWithAuth, { name: ingredientName, price: ingredientPrice })
            if (res) {
                getIngredients()
                handleClear()
                props.displayToast("success",
                    "Ingredient Added", res.name)
                return true
            }
        } catch (error) {
            props.displayToast("error",
                "Failed to insert ingredient", error.message)
        }
    }

    return (<Dialog
        visible={openAddDialog || openEditDialog}
        onHide={hideDialog}
        footer={<FooterDialog hideDialog={props.hideDialog} saveAction={openAddDialog ? handleAddIngredient : handleUpdatedIngredient} />}
        style={{ width: "35%" }}
        header={openAddDialog ? "New Ingredient" : " Edit Ingredient"}
    > <div className="p-field">
            <label htmlFor="username">Ingredient name</label>
            <InputText
                id="ingredient-name"
                value={ingredientName}
                onChange={(e) => setIngredientName(e.target.value)}
                autoFocus
                disabled={openAddDialog ? false : true}
            />
        </div> <div className="p-field">
            <label htmlFor="username">Ingredient price</label>
            <InputNumber
                min={1}
                mode="decimal"
                id="ingredient-price"
                value={ingredientPrice}
                onValueChange={(e) => e.target.value > 1 && setIngredientPrice(e.target.value)}
                autoFocus
            />
        </div> </Dialog>)
};

export default IngredientsForm;