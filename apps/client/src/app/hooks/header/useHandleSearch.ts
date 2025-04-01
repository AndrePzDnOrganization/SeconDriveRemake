import React from 'react';

function useHandleSearch(
  setSearch: React.Dispatch<React.SetStateAction<string>>
) {
  return (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };
}

export default useHandleSearch;
