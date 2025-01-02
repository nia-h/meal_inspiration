"use client";
import { useDebouncedCallback } from "use-debounce";
import { useState, useEffect, useRef, useCallback } from "react";
import { useMainIngreds } from "./useMainIngreds";
import randomColor from "randomcolor"; // import the script
import Link from "next/link";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

// export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
//   const slug = (await params).slug;
//   return <div>My Post: {slug}</div>;
// }

export const QuickMealButtons = () => {
  const [mainIngredsSet, setMainIngredsSet] = useState(new Set<string>());

  const buttonGroupRef = useRef<HTMLDivElement>(null);

  const handleIngredButtonToggle = (e: React.MouseEvent<Element, MouseEvent>): void => {
    const ingredButton = e.target as HTMLButtonElement;
    const ingredient = ingredButton.innerText;
    // console.log("chosen ingredient==>", ingredient);

    if (mainIngredsSet.has(ingredient)) {
      setMainIngredsSet(prev => {
        prev.delete(ingredient);
        console.log("prev==>", prev);

        return new Set(prev);
      });

      ingredButton.classList.remove("ring-2");
      ingredButton.classList.remove("ring-offset-4");
    } else {
      setMainIngredsSet(prev => {
        prev.add(ingredient);
        console.log("prev==>", prev);
        return new Set(prev);
      });
    }
    // updateMainIngreds(Array.from(mainIngredsSet));

    // replace(`${pathname}?${params.toString()}`);

    // console.log("mainIngreds", mainIngreds);    vv
  };

  // const color = randomColor(); // a hex code for an attractive color

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
  // const createQueryString = useCallback(() => {
  //   const searchParams = useSearchParams();
  //   const params = new URLSearchParams(searchParams.toString());

  //   if (mainIngredsSet.size > 0) {
  //     params.set("ingreds", Array.from(mainIngredsSet).join("-"));
  //   } else {
  //     params.delete("ingreds");
  //   }
  //   console.log("params.toString()==>", params.toString());

  //   return params.toString();
  // }, [mainIngredsSet]);

  const createQueryString = () => {
    const searchParams = useSearchParams();
    const params = new URLSearchParams(searchParams.toString());

    if (mainIngredsSet.size > 0) {
      params.set("ingreds", Array.from(mainIngredsSet).join("^"));
    } else {
      params.delete("ingreds");
    }

    return params.toString();
  };
  // const queryString = createQueryString();

  // console.log("queryString==>", queryString);

  useEffect(() => {
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
    // setMyvalue(Math.random().toString());
  }, [mainIngredsSet]);

  return (
    <div className='flex flex-col items-center gap-4'>
      <div ref={buttonGroupRef} className='button-group flex w-full justify-center gap-2 '>
        {ingredButtons}
      </div>

      <Link
        // href={`/quickMeal/?${createQueryString()}`}
        // href={`/QuickMeal/?${queryString}`}

        href={`/QuickMeal?${createQueryString()}`}
        // as={`/nia`}
        className='btn btn-outline btn-primary btn-wide'>
        Go
      </Link>
      <div></div>
    </div>
  );
};
