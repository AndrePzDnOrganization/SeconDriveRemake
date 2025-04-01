import { act, renderHook } from '@testing-library/react';

import useHandleSearch from '@/app/hooks/header/useHandleSearch';
import useIsFocusedState from '@/app/hooks/header/useIsFocusedState';
import useSearchState from '@/app/hooks/header/useSearchState';

describe('useIsFocusedState Hook', () => {
  test('should return initial value', () => {
    const { result } = renderHook(() => useIsFocusedState(true));
    expect(result.current[0]).toBe(true);
  });

  test('should update isFocused state', () => {
    const { result } = renderHook(() => useIsFocusedState(true));

    act(() => {
      result.current[1](false);
    });

    expect(result.current[0]).toBe(false);
  });

  test('should set isFocused to true on focus', () => {
    const { result } = renderHook(() => useIsFocusedState(false));

    act(() => {
      result.current[1](true);
    });

    expect(result.current[0]).toBe(true);
  });

  test('should set isFocused to false on blur', () => {
    const { result } = renderHook(() => useIsFocusedState(true));

    act(() => {
      result.current[1](false);
    });

    expect(result.current[0]).toBe(false);
  });
});

describe('useHandleSearch Hook', () => {
  test('should update search state', () => {
    const { result } = renderHook(() => useSearchState('initial'));
    const [, setSearch] = result.current;

    const handleSearch = useHandleSearch(setSearch);

    act(() => {
      handleSearch({
        target: { value: 'test' },
      } as React.ChangeEvent<HTMLInputElement>);
    });

    expect(result.current[0]).toBe('test');
  });
});
