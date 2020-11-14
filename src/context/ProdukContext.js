import React, { createContext, useState } from "react";

export const ProdukContext = createContext();

export const ProdukProvider = (props) => {
  const [produkList, setProdukList] = useState({
    lists: null,
    selectedId: 0,
    statusForm: "create",
  });

  return (
    <ProdukContext.Provider value={[produkList, setProdukList]}>
      {props.children}
    </ProdukContext.Provider>
  );
};
