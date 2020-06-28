import React from "react";
import { BaseStore } from "../stores/Base/Base.store";

export const StoreContext = React.createContext<{
  baseStore: BaseStore;
}>(undefined!);

export const useStores = () => React.useContext(StoreContext);

/*
export const StoreContext = React.createContext<StoresInterface>(undefined!);

export const useStores = () => React.useContext(StoreContext);
*/
