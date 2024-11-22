"use client";
import { useDebouncedCallback } from "use-debounce";
import { useState, useEffect, useRef } from "react";
import { useMainIngreds } from "./useMainIngreds";
import randomColor from "randomcolor"; // import the script
import Link from "next/link";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

// export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
//   const slug = (await params).slug;
//   return <div>My Post: {slug}</div>;
// }

export const QuickMeal = ({ params }: { params: Promise<{ slug: string }> }) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  // const { mainIngreds, updateMainIngreds } = useMainIngreds();

  const [mainIngredsSet, setMainIngredsSet] = useState(new Set<string>());

  const buttonGroupRef = useRef<HTMLDivElement>(null);

  const handleIngredButtonToggle = (e: React.MouseEvent<Element, MouseEvent>): void => {
    const params = new URLSearchParams(searchParams);

    const ingredButton = e.target as HTMLButtonElement;
    const ingredient = ingredButton.innerText;
    // console.log("chosen ingredient==>", ingredient);

    if (mainIngredsSet.has(ingredient)) {
      mainIngredsSet.delete(ingredient);
      ingredButton.classList.remove("ring-2");
      ingredButton.classList.remove("ring-offset-4");
    } else {
      mainIngredsSet.add(ingredient);
    }
    // updateMainIngreds(Array.from(mainIngredsSet));
    if (mainIngredsSet.size > 0) {
      params.set("ingreds", Array.from(mainIngredsSet).join("-"));
    } else {
      params.delete("ingreds");
    }
    replace(`${pathname}?${params.toString()}`);

    // console.log("mainIngreds", mainIngreds);

    if (!buttonGroupRef.current) {
      console.log("no current");
      return;
    }
    const childNodes = buttonGroupRef.current.childNodes;

    childNodes.forEach(child => {
      if (!(child instanceof HTMLButtonElement)) return;
      if (mainIngredsSet && mainIngredsSet.size > 2) {
        if (!mainIngredsSet.has(child.value)) {
          child.classList.add("btn-disabled");
        }
      } else {
        child.classList.remove("btn-disabled");
      }
    });
  };

  const color = randomColor(); // a hex code for an attractive color

  const ingredients = ["potato", "beef", "celery", "pork", "lamb", "radish"];

  const ingredButtons = ingredients.map(ingred => {
    // console.log("mainIngredsSet==>", mainIngredsSet);
    return (
      <button
        key={ingred}
        value={ingred}
        onClick={e => {
          handleIngredButtonToggle(e);
        }}
        className={`btn opacity-40 ${mainIngredsSet.has(ingred) ? "ring-2 ring-offset-4" : ""}`}
        style={{ backgroundColor: `${randomColor()}` }}>
        {ingred}
      </button>
    );
  });

  // useEffect(() => {
  //   setMainIngredsSet(new Set(mainIngreds));
  // }, [mainIngreds]);

  return (
    <div className='flex flex-col items-center gap-4'>
      <div ref={buttonGroupRef} className='button-group flex w-full justify-center gap-2 '>
        {ingredButtons}
      </div>

      <Link
        href={`/dashboard/quickMeal/?${Array.from(mainIngredsSet).join("-")}`}
        // as={`/nia`}
        className='btn btn-outline btn-primary btn-wide'>
        Go
      </Link>
      <div></div>
    </div>
  );
};
