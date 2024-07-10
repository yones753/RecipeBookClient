import React, { useEffect, useState, useRef } from "react";
import { getRecipeList } from "../../services/recipeService";
import { useFetchWithAuth } from "../../utils/useFetchWithAuth";
import { Toast } from "primereact/toast";
import RecipeItem from "./RecipeItem"
import "./RecipeList.css"
import { Button } from "primereact/button";
import AddRecipeForm from "./AddRecipeForm"

const RecipeList = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchWithAuth = useFetchWithAuth();
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const toast = useRef(null);

  const toggleAddActionDialog = () => {
    setOpenAddDialog(!openAddDialog);
  };

  const displayToast = (severity, summary, detail) => {
    toast.current.show({
      severity: severity,
      summary: summary,
      detail: detail,
    });
  };

  const getRecipes = async () => {
    try {
      const resp = await getRecipeList(fetchWithAuth);
      setRecipes(resp);
      setLoading(false)
    } catch (error) {
      displayToast("error",
        "Failed to fetch recipes",
        error.message)
    }
  };

  useEffect(() => {
    getRecipes()
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Button
        label="Add New Recipe"
        icon="pi pi-plus"
        onClick={toggleAddActionDialog}
        className="p-button-sm"
        tooltip={"Add"}
      />
      <div className="recipe-list">
        {recipes.map((recipe) => (
          <RecipeItem recipe={recipe} getRecipes={getRecipes} displayToast={displayToast} />
        ))}
        <Toast ref={toast} />
        {openAddDialog && <AddRecipeForm displayToast={displayToast} dialogVisible={openAddDialog} getRecipes={getRecipes}
          hideDialog={toggleAddActionDialog}
        />}
      </div>
    </>
  );
};

export default RecipeList;
