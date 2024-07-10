import { Card } from "primereact/card";
import React from "react";
import { deleteRecipe } from "../../services/recipeService"
import { useFetchWithAuth } from "../../utils/useFetchWithAuth";
import DeleteRecipeButton from "./DeleteRecipeButton"

const RecipeItem = (props) => {
  const recipe = props.recipe
  const fetchWithAuth = useFetchWithAuth();
  
  const handleDeleteRecipe = async (rowData) => {
    try {
      const res = await deleteRecipe(fetchWithAuth, rowData.recipeId)
      if (res) {
        props.getRecipes()
        props.displayToast("success",
          "Recipe Deleted",
          res.name,)
      }
    } catch (error) {
      props.displayToast("error",
        "Failed to deleted Recipe",
        error.message,)
    }
  }

  return (
    <Card key={recipe.recipeId} title={<div className="card-recipe-title">{recipe.recipeName} {DeleteRecipeButton(recipe,handleDeleteRecipe)}</div>} className="p-shadow-10" style={{ width: "25rem" }}>
      <div className="recipe-item">
        <div >
          <p className="recipe-item-title">cost: <span>{recipe.recipeCost}$</span></p>
          <p className="recipe-item-title">ingredients:</p>
          <ul>
            {recipe.recipeIngredients.map((ingredient, index) => (
              <><li key={index}>{ingredient.quantity} {ingredient.name}</li></>
            ))}
          </ul>
          <p className="recipe-item-title">instructions:</p>
          <p>{recipe.recipeInstructions}</p>
        </div>
      </div>
    </Card>

  );
};

export default RecipeItem;