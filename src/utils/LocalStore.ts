export const loadState = (state: string) => {
  try {
    const serializedState = localStorage.getItem(state);
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

export const saveState = (name: string, state: any) => {
  if (state == undefined) {
    if (loadState(name) == undefined) localStorage.setItem(name, '0');
  } else {
    try {
      const serializedState = JSON.stringify(state);
      localStorage.setItem(name, serializedState);
    } catch (err) {
      return undefined;
    }
  }
};

export const removeState = (removeArr: string[]) => {
  removeArr.forEach((name: string) => {
    localStorage.removeItem(name);
  });
};

export const createInventoryDataSource = (data: any, draftString: string) => {
  const dataSource = {
    cartId: data.cartId,
    formId: data.formId,
    inventoryTableId: data.id,
    cart: {
      value: data.cartCode,
      key: data.cartId,
      label: data.cartName,
    },
    province: data.city
      ? {
          value: data.city.code,
          key: data.city.code,
          label: data.city.name,
        }
      : null,
    estateType: data.estateType
      ? {
          value: data.estateType.code,
          key: data.estateType.id,
          label: data.estateType.name,
        }
      : null,
    inventoryTable: {
      value: data.inventoryTableCode,
      key: data.id,
      label: data.inventoryTableName,
    },
  };
  saveState(draftString, dataSource);
};
