import prisma from "../../lib/db";
import Image from "next/image";
import { Suspense } from "react";
import { fetchRecipe } from "../../lib/data";
import { Metadata } from "next";
import FoodPhoto from "./foodPhoto";

import { createClient } from "@supabase/supabase-js";
import fs from "fs/promises";

// Create a single supabase client for interacting with your database
const supabase = createClient(
  "https://ujfncbfjalufspswkjny.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVqZm5jYmZqYWx1ZnNwc3dram55Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjg1NjU1MjQsImV4cCI6MjA0NDE0MTUyNH0.9mhQx428JcKNFIKQD4jGIe70c23LRN4oViOyo5n47nk"
);

// export const metadata: Metadata = {
//   title: "Invoices",
// };

import { recipes as Recipe } from "@prisma/client";

type customRecipe = Partial<Recipe> & { publicUrl?: string | null };

async function checkImg(url: string) {
  let boo;
  await fetch(url, { method: "HEAD" })
    .then(res => {
      boo = res.ok;
    })
    .catch(err => console.log("Error:", err));
  console.log("boo==>", boo);
  return boo;
}

export default async function QuickMeal({
  searchParams,
}: {
  searchParams: {
    ingreds: string;
    page?: string;
  };
}) {
  const result = await searchParams;

  const ingreds = result.ingreds || "";

  const ingredsArray = ingreds.split("^");

  console.log("ingredsArray===>", ingredsArray);

  const ingredsParser = (ingreds: string) => {
    // const ingredsSchema = z.array(z.string());

    const regex1 = /(?<=[0-9])"/g;
    const regex2 = /', '/g;
    const regex3 = /\['/g;
    const regex4 = /\']/g;
    // const regex5 = /^^^/g;
    // return ingredsSchema.parse(
    //prettier-ignore
    return JSON.parse(ingreds.replace(regex1, '\\"').replace(regex2, '", "').replace(regex3, '["').replace(regex4, '"]'));

    // );
  };

  const queryBuiler = (array: string[]) => {
    const query: object[] = [];
    array.forEach(ingred => {
      query.push({
        Cleaned_Ingredients: {
          contains: ingred,
        },
      });
    });

    return query;
  };

  const query = queryBuiler(ingredsArray);

  console.log("query==>", query);

  const recipes: customRecipe[] = await prisma.recipes.findMany({
    where: {
      AND: query,
    },

    select: {
      id: true,
      Title: true,
      Image_Name: true,
    },
  });

  // recipes.forEach(async (recipe: customRecipe) => {
  //   recipe.publicUrl = supabase.storage.from("recipe_photos").getPublicUrl(`${recipe.Image_Name}.jpg`).data.publicUrl;
  //   if (!checkImg(recipe.publicUrl)) {
  //     recipe.publicUrl = null;
  //   }
  // });

  for (let recipe of recipes) {
    recipe.publicUrl = supabase.storage.from("recipe_photos").getPublicUrl(`${recipe.Image_Name}.jpg`).data.publicUrl;
    if (!(await checkImg(recipe.publicUrl))) {
      recipe.publicUrl = null;
    }
  }

  console.log("recipes==>", recipes);

  const validRecipes = recipes.filter(recipe => recipe.publicUrl !== null);

  //put everyting inside await

  console.log("validRecipes.length==>", validRecipes.length);

  return (
    <div className='mt-6 flow-root'>
      <div className='inline-block min-w-full align-middle'>
        <div className='rounded-lg bg-gray-50 p-2 md:pt-0'>
          <div className='md:hidden'>{/* for mobile */}</div>
          <table className='hidden min-w-full text-gray-900 md:table'>
            <thead className='rounded-lg text-left text-sm font-normal'>
              <tr>
                <th scope='col' className='px-4 py-5 font-medium sm:pl-6'>
                  <span className='sr-only'>Title</span>
                </th>

                <th scope='col' className='px-3 py-5 font-medium'>
                  Date
                </th>
                <th scope='col' className='px-3 py-5 font-medium'>
                  <span className='sr-only'>photo</span>
                </th>
                <th scope='col' className='relative py-3 pl-6 pr-3'>
                  <span className='sr-only'>Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className='bg-red-700'>
              {validRecipes?.map(recipe => (
                <tr
                  key={recipe.id}
                  className='w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg'>
                  <td className='whitespace-nowrap px-3 py-3'>{recipe.Title}</td>
                  {/* <td className='whitespace-nowrap px-3 py-3'>{formatCurrency(recipe.amount)}</td>
                  <td className='whitespace-nowrap px-3 py-3'>{formatDateToLocal(recipe.date)}</td> */}
                  {/* <td className='whitespace-nowrap px-3 py-3'>
                  <recipeStatus status={recipe.status} />
                  </td> */}
                  <td className='whitespace-nowrap py-3 pl-6 pr-3'>
                    <div className='flex items-center gap-3'>
                      <Image src={recipe.publicUrl as string} className='rounded-full' width={50} height={50} alt={`${recipe.Title}'s picture`} />
                      <p>{recipe.Title}</p>
                    </div>
                  </td>
                  <td className='whitespace-nowrap py-3 pl-6 pr-3'>
                    <div className='flex justify-end gap-3'>{/* <Updaterecipe id={recipe.id} /> */}</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
