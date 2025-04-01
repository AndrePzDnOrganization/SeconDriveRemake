import { useParams } from 'react-router-dom';

function useSearchParams() {
  const { search } = useParams<{ search: string }>();
  return search;
}

export default useSearchParams;
