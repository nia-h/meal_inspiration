"use client";

import { useState, useEffect, useRef } from "react";
import { useMainIngreds } from "./useMainIngreds";
import randomColor from "randomcolor"; // import the script
import Link from "next/link";

export const QuickMeal: React.FunctionComponent = () => {
  const { mainIngreds, updateMainIngreds } = useMainIngreds();

  const [mainIngredsSet, setMainIngredsSet] = useState(new Set<string>());

  //${!mainIngredsSet.has(ingred) && mainIngredsSet.size > 2 ? "btn-disabled" : ""}

  useEffect(() => {
    setMainIngredsSet(new Set(mainIngreds));
  }, [mainIngreds]);

  // const ingredsRouter = useRouter();

  // const mainIngredients = new Set<string>();
  // const [firstRecipe, setFirstRecipe] = useState<Recipe | null>(null);

  // const setMainIngreds = useContext(setMainIngredsContextType);

  // const mainIngreds = useContext(MainIngredsContextType);

  const buttonGroupRef = useRef<HTMLDivElement>(null);

  // const { data, refetch: getIdesRefetch } = api.recipe.getIdeas.useQuery(mainIngreds, { enabled: false });

  const handleIngredButtonToggle = (e: React.MouseEvent<Element, MouseEvent>): void => {
    const ingredButton = e.target as HTMLButtonElement;
    const ingredient = ingredButton.innerText;
    console.log("chosen ingredient==>", ingredient);

    if (mainIngredsSet.has(ingredient)) {
      mainIngredsSet.delete(ingredient);
      ingredButton.classList.remove("ring-2");
      ingredButton.classList.remove("ring-offset-4");
      // if (mainIngreds.size < 3) {
      //   ingredButtons.forEach((ingredButton) => {
      //     // @ts-error-expected dddklk
      //     // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      //     ingredButton.classList.remove("btn-disabled");
      //   });
      // }
    } else {
      mainIngredsSet.add(ingredient);
      // ingredButton.classList.add("ring-2");
      // ingredButton.classList.add("ring-offset-4");
      // if (mainIngreds.size > 2) {
      //   ingredButtons.forEach((ingredButton) => {
      //     console.dir(ingredButton);
      //     // @ts-error-expected dddklk
      //     // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      //     ingredButton.className += "btn-disabled";
      //   });
      // }
    }
    updateMainIngreds(Array.from(mainIngredsSet));

    console.log("mainIngreds", mainIngreds);

    if (!buttonGroupRef.current) {
      console.log("no current");
      return;
    }
    // console.dir(buttonGroupRef.current.childNodes);
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

    // if (mainIngreds.size > 0) {
    //   ingredButton.classList.add("btn-disabled");
    // } else {
    //   ingredButton.classList.remove("btn-disabled");
    // }
  };

  //need a reaact function to limit when it runs

  const color = randomColor(); // a hex code for an attractive color
  // console.log("color==>", color);
  const ingredients = ["potato", "beef", "celery", "pork", "lamb", "radish"];

  const ingredButtons = ingredients.map(ingred => {
    console.log("mainIngredsSet==>", mainIngredsSet);
    return (
      <button
        key={ingred}
        value={ingred}
        onClick={e => {
          handleIngredButtonToggle(e);
        }}
        // className={`${mainIngreds.size > 0 ? "btn-disabled" : ""} btn`}
        // className={`btn bg-['${color}']`}
        className={`btn opacity-40 ${mainIngredsSet.has(ingred) ? "ring-2 ring-offset-4" : ""}`}
        style={{ backgroundColor: `${randomColor()}` }}>
        {ingred}
      </button>
    );
  });

  //  type buttontype = React.ButtonHTMLAttributes<HTMLButtonElement>["type"]

  // const handleIngreds = async () => {
  //   const ingredsSchema = z.array(z.string());
  //   // const recipes = await getIdesRefetch();
  //   // if (!recipes.data?.[0]) return;
  //   // const firstRecipe = recipes.data[0];

  //   // setFirstRecipe(firstRecipe);
  // };

  return (
    <div className='flex flex-col items-center gap-4'>
      <div ref={buttonGroupRef} className='button-group flex w-full justify-center gap-2 '>
        {ingredButtons}
      </div>
      {/* <button
          onClick={() => {
            console.log("mainIngreds==>", mainIngreds);
            void ingredsRouter.push(
              {
                pathname: "/RecipeCard",
                query: {
                  data: JSON.stringify(Array.from(mainIngreds)),
                },
              },
              "/suggestions",
              { shallow: false },
            );
          }}
          className="btn btn-outline btn-primary btn-wide"
        >
          Go
        </button> */}
      <Link
        href={{
          pathname: "/RecipeCard",
          // query: { data: JSON.stringify(Array.from(mainIngreds)) },
        }}
        // as={`/nia`}
        className='btn btn-outline btn-primary btn-wide'>
        Go
      </Link>
      <div>
        {/* {firstRecipe && (
            <RecipeCard
              recipe={firstRecipe}
              onDelete={() => {
                return;
              }}
            />
          )} */}
      </div>
    </div>
  );
};
