import PropTypes from 'prop-types';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

const DataContext = createContext({});

export const api = {
  loadData: async () => {
    const json = await fetch('/events.json');
    return json.json();
  },
};

export const DataProvider = ({ children }) => {
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  // Creating a state to store the latest event.
  const [lastEvent, setlastEvent] = useState(null);
  const getData = useCallback(async () => {
    try {
      // Calling the loadData method of the api object to load the data.
      const apiData = await api.loadData();

      // Data Storage
      setData(apiData);

      // Calculating the latest event by sorting events by date and retrieving the first element of the sorted list.
      const last = apiData?.events.sort((evtA, evtB) =>
        new Date(evtB.date) < new Date(evtA.date) ? -1 : 1
      )[0];

      // Data Storage
      setlastEvent(last);
    } catch (err) {
      setError(err);
    }
  }, []);
  useEffect(() => {
    if (data) return;
    getData();
  });

  return (
    <DataContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{
        data,
        error,
        lastEvent,
        // Using context to provide data. the latest event (lastEvent), to child components through the "value" property.
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

DataProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useData = () => useContext(DataContext);

export default DataContext;
