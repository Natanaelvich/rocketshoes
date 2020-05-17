import produce from 'immer';

const initialState = [];

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case '@cart/ADD_SUCCESS':
      return produce(state, draft => {
        draft.push(payload);
      });

    case '@cart/REMOVE':
      return produce(state, draft => {
        const productIndex = draft.findIndex(p => p.id === payload);

        if (productIndex >= 0) {
          draft.splice(productIndex, 1);
        }
      });

    case '@cart/UPDATE_AMOUNT_SUCCESS':
      if (payload.amount <= 0) {
        return state;
      }
      return produce(state, draft => {
        const productIndex = draft.findIndex(p => p.id === payload.id);
        if (productIndex >= 0) {
          draft[productIndex].amount = Number(payload.amount);
        }
      });
    default:
      return state;
  }
};
