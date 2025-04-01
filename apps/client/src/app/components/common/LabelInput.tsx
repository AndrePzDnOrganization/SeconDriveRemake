import { ChangeEvent, useState } from 'react';

function LabelInput({
  children,
  inputText,
  className,
  onChange,
  maxLength,
}: InputProps) {
  const [inputValue, setInputValue] = useState(inputText);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
    onChange(event.target.value);
  };

  return (
    <div className={`${className} flex flex-col font-ropa w-full text-2xl`}>
      <span>{children}</span>
      <input
        type='text'
        value={inputValue}
        onChange={handleChange}
        className='w-full bg-white text-black text-opacity-50 rounded-md p-2'
        maxLength={maxLength}
        id={inputValue}
      />
    </div>
  );
}

export default LabelInput;
