import { normalize } from "normalizr";
import { camelizeKeys } from "humps";

const API_ROOT = "http://localhost:8080/";

// Fetches an API response and normalizes the result JSON according to schema.
// This makes every API response have the same shape, regardless of how nested it was.
const callApi = async (endpoint, schema, httpBody, httpMethod) => {
  const fullUrl =
    endpoint.indexOf(API_ROOT) === -1 ? API_ROOT + endpoint : endpoint;
  let response = {};

  switch (httpMethod) {
    case "GET":
      response = await fetch(fullUrl);
      break;
    case "POST":
      response = await postHttpRequest(fullUrl, httpBody);
      break;
    case "PUT":
      break;
    case "DELETE":
      response = await deleteHttpRequest(fullUrl, httpBody);
      break;
    default:
      break;
  }

  const json = await response.json();
  if (!response.ok) {
    return Promise.reject(json);
  }
  const camelizedJson = camelizeKeys(json);
  return Object.assign({}, normalize(camelizedJson, schema));
};

// Action key that carries API call info interpreted by this Redux middleware.
export const CALL_API = "Call API";

//Formats the action
//by removing the CALL_API node from the object and include the response type
const actionWith = (action, data) => {
  const finalAction = Object.assign({}, action, data);
  delete finalAction[CALL_API];
  return finalAction;
};

// A Redux middleware that interprets actions with CALL_API info specified.
// Performs the call and promises when such actions are dispatched.
export default store => next => action => {
  const callAPI = action[CALL_API];
  if (typeof callAPI === "undefined") {
    return next(action);
  }

  let { endpoint } = callAPI;
  const { schema, types, httpBody, httpMethod } = callAPI;

  if (typeof endpoint === "function") {
    endpoint = endpoint(store.getState());
  }

  throwErrorIfInvalidRequest(endpoint, schema, types);

  const [requestType, successType, failureType] = types;
  //dispatch on api call
  next(actionWith(action, { type: requestType, isSubmitting: true }));
  return callApi(endpoint, schema, httpBody, httpMethod).then(
    response =>
      next(
        //dispatch onsuccess
        actionWith(action, {
          response,
          type: successType,
          httpMethod: httpMethod,
          id: schema.id,
          isSubmitting: false,
        })
      ),
    error =>
      next(
        //dispatch onfailure
        actionWith(action, {
          type: failureType,
          error: error.message || "Something bad happened",
          isSubmitting: false,
        })
      )
  );
};
async function postHttpRequest(fullUrl, httpBody) {
  return await fetch(fullUrl, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(httpBody),
  });
}
async function deleteHttpRequest(fullUrl, httpBody) {
  return await fetch(fullUrl, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    // body: JSON.stringify(httpBody),
  });
}
function throwErrorIfInvalidRequest(endpoint, schema, types) {
  if (typeof endpoint !== "string") {
    throw new Error("Specify a string endpoint URL.");
  }
  if (!schema) {
    throw new Error("Specify one of the exported Schemas.");
  }
  if (!Array.isArray(types) || types.length !== 3) {
    throw new Error("Expected an array of three action types.");
  }
  if (!types.every(type => typeof type === "string")) {
    throw new Error("Expected action types to be strings.");
  }
}
