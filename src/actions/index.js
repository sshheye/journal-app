import { CALL_API } from "../middlewares/api";
import { Schemas } from "../constants/schemas";
export const JOURNAL_REQUEST = "JOURNAL_REQUEST";
export const JOURNAL_SUCCESS = "JOURNAL_SUCCESS";
export const JOURNAL_FAILURE = "JOURNAL_FAILURE";

// Relies on the custom API middleware defined in ../middleware/api.js.
const fetchJournal = () => ({
  [CALL_API]: {
    types: [JOURNAL_REQUEST, JOURNAL_SUCCESS, JOURNAL_FAILURE],
    endpoint: `journal`,
    schema: Schemas.JOURNAL_ARRAY,
    httpBody: {},
    httpMethod: `GET`,
  },
});

// Fetches  journals from  API unless it is cached.
// Relies on Redux Thunk middleware.
export const loadJournal = () => (dispatch, getState) => {
  const journal = getState().journal;
  if (journal) {
    return null;
  }

  return dispatch(fetchJournal());
};

const apiPostJournal = httpBody => ({
  [CALL_API]: {
    types: [JOURNAL_REQUEST, JOURNAL_SUCCESS, JOURNAL_FAILURE],
    endpoint: `journal`,
    httpBody: {
      title: httpBody.title,
      journalContent: httpBody.journalContent,
      journalDate: httpBody.journalDate,
    },
    httpMethod: "POST",

    schema: Schemas.JOURNAL,
  },
});

export const postJournal = httpBody => (dispatch, getState) => {
  //todo
  const journal = getState().journals;
  if (journal) {
    return null;
  }
  return dispatch(apiPostJournal(httpBody));
};

const apiDeleteJournal = id => ({
  [CALL_API]: {
    types: [JOURNAL_REQUEST, JOURNAL_SUCCESS, JOURNAL_FAILURE],
    endpoint: `journal/${id}`,
    // httpBody: {
    //   title: httpBody.id,
    // },
    httpMethod: "DELETE",
    schema: Schemas.JOURNAL,
  },
});

export const deleteJournal = httpBody => (dispatch, getState) => {
  return dispatch(apiDeleteJournal(httpBody));
};

export const RESET_ERROR_MESSAGE = "RESET_ERROR_MESSAGE";

// Resets the currently visible error message.
export const resetErrorMessage = () => ({
  type: RESET_ERROR_MESSAGE,
});
