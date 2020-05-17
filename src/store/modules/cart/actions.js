export const addToCartRequest = payload => ({
  type: '@cart/ADD_REQUEST',
  payload,
});

export const addToCartSuccess = payload => ({
  type: '@cart/ADD_SUCCESS',
  payload,
});

export const removeFromCart = payload => ({
  type: '@cart/REMOVE',
  payload,
});

export const updateAmountRequest = payload => ({
  type: '@cart/UPDATE_AMOUNT_REQUEST',
  payload,
});

export const updateAmountSuccess = payload => ({
  type: '@cart/UPDATE_AMOUNT_SUCCESS',
  payload,
});
