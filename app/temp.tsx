{recipes?.map(recipe => (
    <tr
      key={recipe.id}
      className='w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg'>
      <td className='whitespace-nowrap py-3 pl-6 pr-3'>
        <div className='flex items-center gap-3'>
          <p>{recipe.Title}</p>
          <Image
            src={`https://ujfncbfjalufspswkjny.supabase.co/storage/v1/object/public/recipe_photos/${recipe.Image_Name}.jpg`}
            className='rounded-full'
            width={28}
            height={28}
            alt={`picture of ${recipe.Title}`}
          />
        </div>
      </td>

      <td className='whitespace-nowrap px-3 py-3'>{/* <InvoiceStatus status={invoice.status} /> */}</td>
      <td className='whitespace-nowrap py-3 pl-6 pr-3'>
        <div className='flex justify-end gap-3'>
          {/* <UpdateInvoice id={invoice.id} />
          <DeleteInvoice id={invoice.id} /> */}
        </div>
      </td>
    </tr>
  ))}