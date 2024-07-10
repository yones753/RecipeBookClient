import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { Dropdown } from "primereact/dropdown";
import React, { useEffect, useState, useRef } from "react";
import FooterDialog from "../modal/FooterDialog"
import { getIngredientsPriceList } from "../../services/ingredientService"
import { useFetchWithAuth } from "../../utils/useFetchWithAuth";
import { insertRecipe } from "../../services/recipeService"
import { emptyIngredients } from "../../constants/constants"

const AddRecipeForm = (props) => {
    const [ingredients, setIngredients] = useState([]);
    const [selectedIngredient, setSelectedIngredient] = useState(emptyIngredients);
    const [recipeName, setRecipeName] = useState(null);
    const [instructions, setInstructions] = useState(null);
    const fetchWithAuth = useFetchWithAuth();

    const handleAddRecipe = async () => {
        try {
            const body = {
                "recipeName": recipeName,
                "recipeInstructions": instructions,
                "recipeIngredients": [
                    selectedIngredient
                ]
            }
            const res = await insertRecipe(fetchWithAuth, body)
            if (res) {
                await props.getRecipes()
                props.displayToast("success", "Recipe Added", res.name)
                return true
            }
        } catch (error) {
            props.displayToast("error", "Failed to insert Recipe", error.message)
        }

    }

    const getIngredients = async () => {
        try {
            const resp = await getIngredientsPriceList(fetchWithAuth);
            setIngredients(resp);
        } catch (error) {
            props.displayToast("error", "Failed to fetch ingredients", error.message)
        }
    };

    const handleInputChange = (event) => {
        const value = event.target.value
        if (event.target.name == "recipe-name") {
            setRecipeName(value)
        }
        else if (event.target.name == "ingredient-quantity") {
            setSelectedIngredient({ ...selectedIngredient, quantity: value });
        }
        else {
            setInstructions(value)
        }
    };

    const handleIngredientChange = (event) => {
        const selected = ingredients.find(item => item.id === event.value);
        if (selected) {
            setSelectedIngredient({
                ...selectedIngredient,
                name: selected.name,
                ingredientPriceId: selected.id
            });
        }
    };

    useEffect(() => {
        getIngredients()
    }, []);

    return (<Dialog
        visible={props.dialogVisible}
        onHide={props.hideDialog}
        footer={<FooterDialog hideDialog={props.hideDialog} saveAction={handleAddRecipe} />}
        style={{ width: "35%" }}
        header={"New Recipe"}
    >
        <div className="p-fluid">
            <div className="p-field m-1">
                <label htmlFor="action-name">Recipe Name</label>
                <InputText
                    name="recipe-name"
                    id="recipe-name"
                    value={recipeName}
                    onChange={handleInputChange}
                />
            </div>
            <div className="p-field m-1" >
                <label htmlFor="instructions">Instructions</label>
                <textarea
                    style={{ width: "100%" }}
                    id="instructions"
                    maxLength={500}
                    required
                    className="p-2 m-1"
                    name="instructions"
                    value={instructions}
                    onChange={handleInputChange}
                />
            </div>
            <br />
            <div className="p-field m-1">
                <label>Ingredient</label>
                <div className="formgrid grid">
                    <div className="field col w-1">
                        <Dropdown
                            options={ingredients.map(item => ({ value: item.id, label: item.name }))}
                            placeholder="Ingredient name"
                            className="p-mr-2 p-dropdown-sm"
                            value={selectedIngredient.ingredientPriceId}
                            onChange={handleIngredientChange}
                        />
                    </div>
                    <div className="field col w-1">
                        <InputNumber
                            min={0}
                            name="ingredient-quantity"
                            id="ingredient-quantity"
                            placeholder="Ingredient quantity"
                            onValueChange={handleInputChange}
                        />
                    </div>
                </div>
            </div>
            <br />
        </div>
    </Dialog>)
};

export default AddRecipeForm;