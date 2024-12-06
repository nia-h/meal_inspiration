import prisma from "../../lib/db";
import Image from "next/image";
import { Suspense } from "react";
import { fetchRecipe } from "../../lib/data";
import { Metadata } from "next";

// export const metadata: Metadata = {
//   title: "Invoices",
// };

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

  const results = await prisma.recipes.findMany({
    where: {
      AND: queryBuiler(ingredsArray),
    },
    take: 1,
  });

  // const ingredArray = ingredsParser(results[0].Cleaned_Ingredients!);
  console.log("results===>", results);

  return <div className='w-full'>{`${ingreds}`}</div>;
}
