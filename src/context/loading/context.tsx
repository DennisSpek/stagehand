import { createContext, useState, useEffect, useContext } from 'react';

interface loadingContextType {
  loading: boolean
  setLoading: (loading: boolean) => void;
}

// Create the UserContext with the initial values.
export const loadingContext = createContext<loadingContextType>({
  loading: false,
  setLoading: () => {}
});

export const useLoading = () => useContext(loadingContext);
