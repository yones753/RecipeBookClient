export const getRecipeList = async (fetchWithAuth) => {
  try {
    const response = await fetchWithAuth(
      `http://localhost:8080/api/recipes`
    );
    if (response.ok) {
      const result = await response.json();
      return result
    }
    else {
      const result = await response.text();
      throw new Error(result);

    }
  }
  catch (error) {
    throw new Error(error);
  }
};

export const insertRecipe = async (fetchWithAuth, reqBody) => {
  try {
    const url = "http://localhost:8080/api/recipes"
    const method = "POST";
    const response = await fetchWithAuth(url, method, reqBody);

    if (response.ok) {
      const result = await response.json();
      return result
    }
    else {
      const resultText = await response.text();
      throw new Error(resultText);

    }
  }
  catch (error) {

    throw new Error(error);
  }
};

export const deleteRecipe = async (fetchWithAuth, recipeId) => {
  try {
    const url = `http://localhost:8080/api/recipes/${recipeId}`
    const method = "DELETE";
    const response = await fetchWithAuth(url, method);
    if (response.ok) {
      return response
    }
    else {
      const resultText = await response.text();
      throw new Error(resultText);
    }
  }
  catch (error) {
    throw new Error(error);
  }
};

