// let skip = 0;
// while (skip + 100 < 9000) {
//   console.log("skip==>", skip);
//   const recipes = await prisma.recipes.findMany({
//     skip,
//     take: 100,
//     select: {
//       id: true,
//       Title: true,
//       Image_Name: true,
//     },
//   });

//   recipes.forEach(async recipe => {
//     const { data, error } = await supabase.storage.from("recipe_photos").download(`/${recipe.Image_Name}.jpg`);
//     if (!data) {
//       const deleted_recipe = await prisma.recipes.delete({
//         where: {
//           id: recipe.id,
//         },
//       });
//       console.log("deleted_recipe==>", deleted_recipe.Title);
//     }
//   });
//   skip += 100;
// }

// console.log("recipes==>", recipes);
// const { data, error } = await supabase.from("recipes").select().eq("Image_Name", "turmeric-hot-toddy-claire-sprouse");

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

// const { data, error } = await supabase.storage.from("recipe_photos").download("/coconut-beef-curry.jpg");

// console.log("data==>", data);
// console.log("error==>", error);

// const downloadUrl = URL.createObjectURL(data!);
