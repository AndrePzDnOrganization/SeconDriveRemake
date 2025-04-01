function CheckboxPrice({ valuePrice, checked, onToggle }: CheckboxPriceProps) {
  return (
    <div className='flex items-center text-[25px]'>
      {valuePrice}&nbsp;&nbsp;
      <input
        className='rounded-full appearance-none bg-white w-6 h-6 border-2 border-gray-300 checked:bg-[#ff0000] checked:border-white focus:outline-none'
        type='checkbox'
        checked={Boolean(checked)}
        onChange={onToggle}
      />
    </div>
  );
}

export default CheckboxPrice;
