function InvoicePage() {
  return (
    <>
      <head>
        <meta
          charSet='UTF-8'
          name='viewport'
          content='width=device-width, initial-scale=1.0'
        />
        <title>Invoice Report</title>
        <link
          href='https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css'
          rel='stylesheet'
        />
      </head>
      <body className='bg-gray-100 justify-center w-full'>
        <div className='container mx-auto px-4 py-8'>
          <h1 className='text-2xl font-bold mb-6'>Invoice Report</h1>
          <div className='bg-white shadow-md rounded my-6'>
            <table className='w-full table-auto'>
              <thead>
                <tr className='bg-gray-200'>
                  <th className='py-2 px-4 border border-x-black'>Product</th>
                  <th className='py-2 px-4 border border-x-black'>Price</th>
                  <th className='py-2 px-4 border border-x-black'>Amount</th>
                  <th className='py-2 px-4 border border-x-black'>pene</th>
                </tr>
              </thead>
              <tbody>
                <tr className=' text-center'>
                  <td className='py-2 px-4 border border-x-black'>Motor 1</td>
                  <td className='py-2 px-4 border border-x-black'>$250.00</td>
                  <td className='py-2 px-4 border border-x-black'>1</td>
                  <td className='py-2 px-4 border border-x-black'>pene</td>
                </tr>
                <tr>
                  <td className='py-2 px-4 border border-x-black'>Motor 2</td>
                  <td className='py-2 px-4 border border-x-black'>$400.00</td>
                  <td className='py-2 px-4 border border-x-black'>1</td>
                  <td className='py-2 px-4 border border-x-black'>pene</td>
                </tr>
                <tr>
                  <td className='py-2 px-4 border border-x-black'>Motor 3</td>
                  <td className='py-2 px-4 border border-x-black'>$350.00</td>
                  <td className='py-2 px-4 border border-x-black'>1</td>
                  <td className='py-2 px-4 border border-x-black'>pene</td>
                </tr>
                <tr>
                  <td className='py-2 px-4 border border-x-black'>wheel 0</td>
                  <td className='py-2 px-4 border border-x-black'>$350.00</td>
                  <td className='py-2 px-4 border border-x-black'>1</td>
                  <td className='py-2 px-4 border border-x-black'>pene</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </body>
    </>
  );
}

export default InvoicePage;
