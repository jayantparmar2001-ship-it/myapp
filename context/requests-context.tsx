import React, { createContext, useContext, useState, useCallback } from 'react';
import { ServiceRequest } from '@/data/services';

type RequestsContextType = {
  requests: ServiceRequest[];
  addRequest: (request: Omit<ServiceRequest, 'id' | 'status' | 'createdAt'>) => void;
  cancelRequest: (id: string) => void;
};

const RequestsContext = createContext<RequestsContextType>({
  requests: [],
  addRequest: () => {},
  cancelRequest: () => {},
});

export function RequestsProvider({ children }: { children: React.ReactNode }) {
  const [requests, setRequests] = useState<ServiceRequest[]>([]);

  const addRequest = useCallback((req: Omit<ServiceRequest, 'id' | 'status' | 'createdAt'>) => {
    const newRequest: ServiceRequest = {
      ...req,
      id: Date.now().toString(),
      status: 'pending',
      createdAt: new Date().toISOString(),
    };
    setRequests((prev) => [newRequest, ...prev]);
  }, []);

  const cancelRequest = useCallback((id: string) => {
    setRequests((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: 'cancelled' as const } : r))
    );
  }, []);

  return (
    <RequestsContext.Provider value={{ requests, addRequest, cancelRequest }}>
      {children}
    </RequestsContext.Provider>
  );
}

export const useRequests = () => useContext(RequestsContext);
