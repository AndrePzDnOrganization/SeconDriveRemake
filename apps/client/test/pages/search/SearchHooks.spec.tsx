import { renderHook } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import useSearchParams from '@/app/hooks/search/useSearchParams';

describe('useSearchParams Hook', () => {
  test('should return an empty string if the search parameter is not present in the URL', () => {
    const { result } = renderHook(() => useSearchParams(), {
      wrapper: MemoryRouter,
      initialProps: { initialEntries: ['/some-other-route'] },
    });

    expect(result.current).toBe(undefined);
  });
});
