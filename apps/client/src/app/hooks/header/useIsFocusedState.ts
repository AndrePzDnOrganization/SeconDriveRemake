import { useState } from 'react';

function useIsFocusedState(initialValue: boolean) {
  const [isFocused, setIsFocused] = useState<boolean>(initialValue);
  return [isFocused, setIsFocused] as const;
}

export default useIsFocusedState;
