"use client";

export default function FoodPhoto({ url }: { url: string }) {
  console.log("url===>", url);
  return <img src={url} className='rounded-full' width={40} height={40} alt={`picture of`} />;
}
