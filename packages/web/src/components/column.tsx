const Column = ({name, children}) => (
    <div className='rounded bg-gray-200 p-8 overflow-auto my-10'>
      <div className=''>
        <h2 className='text-xl underline uppercase font-semibold'>{name}</h2>
      </div>
      <div>
        {children}
      </div>
    </div>
  )

export default Column