import { useState, useEffect, useCallback } from 'react';
import { Patient } from '../types';
import { PatientService, SearchArchiveResult } from '../services/patientService';
import { useDebounce } from './useDebounce';

export type SearchStatus = 'idle' | 'loading' | 'success' | 'empty' | 'error';

export interface UseArchiveSearchReturn {
  query: string;
  setQuery: (q: string) => void;
  status: SearchStatus;
  results: Patient[];
  executionTimeMs: number;
  errorMessage: string | null;
  totalRecordsSearched: number;
  refresh: () => void;
}

export function useArchiveSearch(initialQuery: string = ''): UseArchiveSearchReturn {
  const [query, setQuery] = useState(initialQuery);
  const debouncedQuery = useDebounce(query, 120);
  const [status, setStatus] = useState<SearchStatus>('idle');
  const [results, setResults] = useState<Patient[]>([]);
  const [executionTimeMs, setExecutionTimeMs] = useState<number>(0);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const executeSearch = useCallback(async (q: string) => {
    setStatus('loading');
    setErrorMessage(null);
    try {
      const res: SearchArchiveResult = await PatientService.searchArchive(q);
      setExecutionTimeMs(res.executionTimeMs);
      setResults(res.results);
      if (res.results.length === 0) {
        setStatus('empty');
      } else {
        setStatus('success');
      }
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : 'فشل تنفيذ استعلام الأرشيف');
      setStatus('error');
    }
  }, []);

  useEffect(() => {
    executeSearch(debouncedQuery);
  }, [debouncedQuery, executeSearch]);

  return {
    query,
    setQuery,
    status,
    results,
    executionTimeMs,
    errorMessage,
    totalRecordsSearched: 65000,
    refresh: () => executeSearch(query)
  };
}
