type Props = {
  discount: number;
};

function OfferBadge({ discount }: Props) {
  return (
    <div className='absolute top-4 text-2xl font-bold right-0 bg-[#DC0700] text-white p-1 font-ropa'>
      {discount}%
    </div>
  );
}

export default OfferBadge;
