import {
  createContext,
  // useState,
  useEffect,
  useContext,
  useReducer,
  useCallback,
} from "react";

const BASE_URL = "http://localhost:9000";

const CitiesContext = createContext();

const iniitalState = {
  cities: [],
  isLoading: false,
  currentCity: {},
  error: "", // we also created an error state for which we created case 'rejected' in reducer. We are not going to use this state in our application beacause we are not
  //            doing much error handling, but this was just to make it a bit more complete
};

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true };
    case "cities/loaded":
      // it is usually a good idea to use a meaningful naming convention when naming action types. So it is a good idea to model the actions as events and not as setters.
      // For example, it should not be cities, but instead we can call it cities/loaded. WE could also use citiesLoaded but it is a bit of a naming convention to use a
      // slash like cities/loaded, atleast in the Redux xommunity which is actually similar to what we are implementing here
      return { ...state, isLoading: false, cities: action.payload };
    case "city/loaded":
      return { ...state, isLoading: false, currentCity: action.payload };
    case "city/created":
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, action.payload],
        currentCity: action.payload,
      };
    case "city/deleted":
      return {
        ...state,
        isLoading: false,
        cities: state.cities.filter((city) => city.id !== action.payload),
        currentCity: {},
      };
    case "rejected":
      return { ...state, isLoading: false, error: action.payload };
    default:
      throw new Error("Unknown action type");
  }
}

function CitiesProvider({ children }) {
  // const [cities, setCities] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  // const [currentCity, setCurrentCity] = useState(false);

  const [{ cities, isLoading, currentCity, error }, dispatch] = useReducer(
    // we immediately destructure the state back here into cities, isLoading, currentCity and error(which we are not using but we passed it into the context as well)
    reducer,
    iniitalState
  );

  // useEffect(function () {
  //   async function fetchCities() {
  //     try {
  //       setIsLoading(true);
  //       const res = await fetch(`${BASE_URL}/cities`);
  //       const data = await res.json();
  //       setCities(data);
  //     } catch {
  //       alert("There was an error loading data");
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   }
  //   fetchCities();
  // }, []);

  useEffect(function () {
    async function fetchCities() {
      dispatch({ type: "loading" });

      try {
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();

        dispatch({ type: "cities/loaded", payload: data });
      } catch {
        dispatch({
          type: "rejected",
          payload: "There was an error loading cities...",
        });
      }
    }
    fetchCities();
  }, []);

  // async function getCity(id) {
  //   try {
  //     setIsLoading(true);
  //     const res = await fetch(`${BASE_URL}/cities/${id}`);
  //     const data = await res.json();
  //     setCurrentCity(data);
  //   } catch {
  //     alert("There was an error loading data");
  //   } finally {
  //     setIsLoading(false);
  //   }
  // }

  // async function getCity(id) {
  //   if (Number(id) === currentCity.id) return; // here we check if the id that is being passed in is the same as the currentCity and so we can check is the city that
  //   //                                            we want to load is already the current city and so if it is, there is no need to call the API again. Here id is
  //   //                                            converted to Number because it is coming from URL so it is a string

  //   dispatch({ type: "loading" });

  //   try {
  //     const res = await fetch(`${BASE_URL}/cities/${id}`);
  //     const data = await res.json();

  //     dispatch({ type: "city/loaded", payload: data });
  //   } catch {
  //     dispatch({
  //       type: "rejected",
  //       payload: "There was an error loading the city...",
  //     });
  //   }
  // }

  const getCity = useCallback(
    async function getCity(id) {
      if (Number(id) === currentCity.id) return; // here we check if the id that is being passed in is the same as the currentCity and so we can check is the city that we
      //                                            want to load is already the current city and so if it is, there is no need to call the API again. Here id is converted to
      //                                            Number because it is coming from URL so it is a string

      dispatch({ type: "loading" });

      try {
        const res = await fetch(`${BASE_URL}/cities/${id}`);
        const data = await res.json();

        dispatch({ type: "city/loaded", payload: data });
      } catch {
        dispatch({
          type: "rejected",
          payload: "There was an error loading the city...",
        });
      }
    },
    [currentCity.id]
  );

  // async function createCity(newCity) {
  //   try {
  //     setIsLoading(true);
  //     const res = await fetch(`${BASE_URL}/cities`, {
  //       method: "POST",
  //       body: JSON.stringify(newCity),
  //       headers: {
  //         "content-type": "application/json", // here the content-type header is set to application/json, just so the API knows, what data format it is receiving
  //       },
  //     });
  //     const data = await res.json();

  //     // console.log(data);

  //     setCities((cities) => [...cities, data]);
  //   } catch {
  //     alert("There was an error creating city");
  //   } finally {
  //     setIsLoading(false);
  //   }
  // }

  async function createCity(newCity) {
    dispatch({ type: "loading" });

    try {
      const res = await fetch(`${BASE_URL}/cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "content-type": "application/json", // here the content-type header is set to application/json, just so the API knows, what data format it is receiving
        },
      });
      const data = await res.json();

      // console.log(data);

      dispatch({ type: "city/created", payload: data }); // here we keep our remote state in sync with our UI state
    } catch {
      dispatch({
        type: "rejected",
        payload: "There was an error creating the city...",
      });
    }
  }

  // async function deleteCity(id) {
  //   try {
  //     setIsLoading(true);
  //     await fetch(`${BASE_URL}/cities/${id}`, {
  //       method: "DELETE",
  //     });

  //     // console.log(data);

  //     setCities((cities) => cities.filter((city) => city.id !== id));
  //   } catch {
  //     alert("There was an error deleting data");
  //   } finally {
  //     setIsLoading(false);
  //   }
  // }

  async function deleteCity(id) {
    dispatch({ type: "loading" });

    try {
      await fetch(`${BASE_URL}/cities/${id}`, {
        method: "DELETE",
      });

      // console.log(data);

      dispatch({ type: "city/deleted", payload: id });
    } catch {
      dispatch({
        type: "rejected",
        payload: "There was an error deleting the city...",
      });
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        error,
        getCity,
        createCity,
        deleteCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

function useCities() {
  const context = useContext(CitiesContext);

  if (context === undefined)
    throw new Error("CitiesContext was used outside the CitiesProvider");

  return context;
}

export { CitiesProvider, useCities };
