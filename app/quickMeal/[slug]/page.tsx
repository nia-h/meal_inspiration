import prisma from "../../../lib/db";
import Image from "next/image";

export default async function Page({ params }: { params: { slug: string } }) {
  const { slug } = await params;
  console.log("slug==>", slug);

  // const results = await prisma.recipes.findMany({where: {
  //   Cleaned_Ingredients: {

  //       contains: ,
  //     },

  // },
  //   take: 4,
  // });

  // console.log("image-name===>", results[1].Image_Name);
  return (
    <>
      <Image
        src='https://ujfncbfjalufspswkjny.supabase.co/storage/v1/object/public/recipe_photos/coconut-and-cream-float-56389659.jpg'
        alt='Picture of the author'
        width={500}
        height={500}
      />
    </>
  );
}
