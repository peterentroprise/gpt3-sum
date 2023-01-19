import { useState } from "react";
import { ResponseChoice } from "./ResponseChoice";

export const ResponseData = ({ data, modelCostPerToken }) => {
  console.log("RESPONSE DATA");
  console.log(data.data);
  return (
    <div>
      <div className="mt-1 flex items-center space-x-1">
        <p className="font-medium">Prompt tokens used:</p>
        <p className="">{data.data.usage["prompt_tokens"]}</p>
        <p className="text-xs">
          - ${(data.data.usage["prompt_tokens"] * modelCostPerToken).toFixed(5)}
        </p>
      </div>

      <div className="mt-1 flex items-center space-x-1">
        <p className="font-medium">Completion tokens used:</p>
        <p className="">{data.data.usage["completion_tokens"]}</p>
        <p className="text-xs">
          - $
          {(data.data.usage["completion_tokens"] * modelCostPerToken).toFixed(
            5
          )}
        </p>
      </div>

      <div className="mt-1 flex items-center space-x-1">
        <p className="font-medium">Total tokens used:</p>
        <p className="">{data.data.usage["total_tokens"]}</p>
        <p className="text-xs">
          - ${(data.data.usage["total_tokens"] * modelCostPerToken).toFixed(5)}
        </p>
      </div>
      <div className="mt-4 py-14">
        <p className="block font-medium">Response</p>
        <ul className="mt-1">
          {data.data.choices.map((choice, index) => (
            <ResponseChoice
              key={index}
              choice={choice}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};
