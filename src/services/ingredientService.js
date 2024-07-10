export const getIngredientList = async (fetchWithAuth) => {
    try {
        const response = await fetchWithAuth(
            `http://localhost:8080/api/ingredients`
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

export const getIngredientsPriceList = async (fetchWithAuth) => {
    try {
        const response = await fetchWithAuth(
            `http://localhost:8080/api/ingredientPrices`
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

export const insertIngredient = async (fetchWithAuth, reqBody) => {
    try {
        const url = "http://localhost:8080/api/ingredientPrices"
        const method = "POST";
        const response = await fetchWithAuth(url, method, reqBody);

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


export const updatedIngredient = async (fetchWithAuth, reqBody, ingredientId) => {
    try {
        const url = `http://localhost:8080/api/ingredientPrices/${ingredientId}`
        const method = "PUT";
        const response = await fetchWithAuth(url, method, reqBody);

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

export const deleteIngredient = async (fetchWithAuth, ingredientId) => {
    try {
        const url = `http://localhost:8080/api/ingredientPrices/${ingredientId}`
        const method = "DELETE";
        const response = await fetchWithAuth(url, method);
        if (response.ok) {
            return response
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

