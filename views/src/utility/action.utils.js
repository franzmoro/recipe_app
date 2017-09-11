const PENDING_SUFFIX = '_PENDING';
const FULFILLED_SUFFIX = '_FULFILLED';
const REJECTED_SUFFIX = '_REJECTED';

export const createAction = (type, payload) => ({ type, payload });

export const pendingAction = actionName => `${actionName}${PENDING_SUFFIX}`;
export const fulfilledAction = actionName => `${actionName}${FULFILLED_SUFFIX}`;
export const rejectedAction = actionName => `${actionName}${REJECTED_SUFFIX}`;
