import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  productsByCategory: {}, 
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    
    addProductsToCategory: (state, action) => {
      const { category, products } = action.payload;

      if (!state.productsByCategory[category]) state.productsByCategory[category] = [];

      products.forEach((p) => {
        const exists = state.productsByCategory[category].some((prod) => prod.id === p.id);
        if (!exists) state.productsByCategory[category].push(p);
      });

      if (category !== "all") {
        if (!state.productsByCategory["all"]) state.productsByCategory["all"] = [];
        products.forEach((p) => {
          const existsAll = state.productsByCategory["all"].some((prod) => prod.id === p.id);
          if (!existsAll) state.productsByCategory["all"].push(p);
        });
      }
    },

    updateProductInCategory: (state, action) => {
      const { category, id, data } = action.payload;

      const catProducts = state.productsByCategory[category] || [];
      state.productsByCategory[category] = catProducts.map((prod) =>
        prod.id === id ? { ...prod, ...data } : prod
      );

      if (category !== "all") {
        const allProducts = state.productsByCategory["all"] || [];
        state.productsByCategory["all"] = allProducts.map((prod) =>
          prod.id === id ? { ...prod, ...data } : prod
        );
      }
    },
  },
});

export const { addProductsToCategory, updateProductInCategory } = productSlice.actions;
export default productSlice.reducer;