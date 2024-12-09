"use client";
import prisma from "../../lib/db";
import Image from "next/image";
import { Suspense } from "react";
import { fetchRecipe } from "../../lib/data";
import { Metadata } from "next";

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

export default async function QuickMeal({
  searchParams,
}: {
  searchParams: {
    ingreds: string;
    page?: string;
  };
}) {
  // const { data, error } = await supabase.storage.from("recipe_photos").download("/coconut-beef-curry.jpg");

  // console.log("data===>", data);

  // console.log("error===>", error);
  // const { data, error } = await supabase.storage.getBucket("recipe_photos");

  // console.log("data===>", data);

  // console.log("error===>", error);

  const result = await searchParams;

  const ingreds = result.ingreds || "";

  const ingredsArray = ingreds.split("^");

  // console.log("ingredsArray===>", ingredsArray);

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

  // const queryBuiler = (array: string[]) => {
  //   const query: object[] = [];
  //   array.forEach(ingred => {
  //     query.push({
  //       Cleaned_Ingredients: {
  //         contains: ingred,
  //       },
  //     });
  //   });

  //   return query;
  // };

  // const query = queryBuiler(ingredsArray);

  // console.log("query==>", query);

  // const recipes = await prisma.recipes.findMany({
  //   where: {
  //     AND: query,
  //   },
  //   take: 1,
  // });

  // const downloadFile = async (bucketName: string, filePath: string, downloadFilePath: string) => {
  //   const { data, error } = await supabase.storage.from(bucketName).download(filePath);

  //   if (error) {
  //     throw error;
  //   }

  //   downloadUrl = URL.createObjectURL(data);

  //   console.log("downlaodUrl==>", downloadUrl);

  //   const buffer = Buffer.from(await data.arrayBuffer());
  //   // await fs.writeFile(downloadFilePath, buffer);
  //   // console.log(`File downloaded to ${downloadFilePath}`);
  // };

  // const bucketName = "recipe_photos";
  // const filePath = `/coconut-beef-curry.jpg`; // in your Supabase bucket
  // const downloadFilePath = "/var/temp";
  // downloadFile(bucketName, filePath, downloadFilePath);

  // console.log("recipes===>", recipes);

  const { data, error } = await supabase.storage.from("recipe_photos").download("/coconut-beef-curry.jpg");

  console.log("data==>", data);
  console.log("error==>", error);

  const downloadUrl = URL.createObjectURL(data!);

  return (
    <div className='mt-6 flow-root'>
      <div className='inline-block min-w-full align-middle'>
        <div className='rounded-lg bg-gray-50 p-2 md:pt-0'>
          <table className='hidden min-w-full text-gray-900 md:table'>
            <thead className='rounded-lg text-left text-sm font-normal'></thead>
            <tbody className='bg-white'></tbody>
          </table>
          <img src={downloadUrl} className='rounded-full' width={40} height={40} alt={`picture of`} />
        </div>
      </div>
    </div>
  );
}
