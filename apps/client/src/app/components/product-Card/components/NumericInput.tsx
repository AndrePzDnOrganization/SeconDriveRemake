import { ChangeEvent, useEffect, useState } from 'react';

function NumericInput({
  max,
  onChange,
  onError,
  initialValue = 1,
}: NumericInputProps) {
  const [value, setValue] = useState<number>(0);
  const buttonStyle = 'border border-black text-center bg-white w-[15px]';

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  const handleIncrement = () => {
    if (value < max) {
      setValue(value + 1);
      onChange(value + 1);
      onError('');
    } else if (onError) {
      onError(`Can not go over stock (${max})`);
    }
  };

  const handleDecrement = () => {
    if (value > 1) {
      setValue(value - 1);
      onChange(value - 1);
      onError('');
    } else if (onError) {
      onError(`Quantity mus be 1 or more`);
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const inputValue = Number(event.target.value);

    if (!Number.isNaN(inputValue) && inputValue >= 1 && inputValue <= max) {
      setValue(inputValue);
      onChange(inputValue);
      if (onError) {
        onError('');
      }
    } else if (onError && inputValue > max) {
      onError(`Can not go over stock (${max})`);
    } else if (onError && inputValue < 1) {
      onError(`Quantity mus be 1 or more`);
    }
  };

  return (
    <div className='flex  items-center'>
      <div className='flex flex-col'>
        <div className='flex flex-row  h-5'>
          <button
            className={buttonStyle}
            type='button'
            onClick={handleDecrement}
          >
            -
          </button>
          <input
            className='w-[30px] border border-black text-center text-sm'
            type='text'
            value={value}
            onChange={handleChange}
          />
          <button
            className={buttonStyle}
            type='button'
            onClick={handleIncrement}
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
}

export default NumericInput;
