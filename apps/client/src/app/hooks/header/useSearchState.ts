import { useState } from 'react';

function useSearchState(initialValue: string) {
  const [search, setSearch] = useState<string>(initialValue);
  return [search, setSearch] as const;
}

export default useSearchState;
