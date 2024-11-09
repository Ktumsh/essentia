import { Fragment } from "react";

import { LinkIcon } from "@/modules/icons/action";

const InfoWindowContent = ({ placeDetails }: any) => (
  <div className="mt-4 flex flex-col gap-2 text-main-h dark:text-main-dark-h">
    <h2 className="absolute left-0 top-0 m-4 font-dmsans text-xl font-bold">
      {placeDetails.name}
    </h2>
    <p className="font-normal">
      <strong className="font-bold">Dirección:</strong>{" "}
      {placeDetails.formatted_address}
    </p>
    {placeDetails.rating && (
      <p className="font-normal">
        <strong className="font-bold">Rating:</strong> {placeDetails.rating}
      </p>
    )}
    {placeDetails.opening_hours && (
      <p className="font-normal">
        <strong className="font-bold">Horario:</strong>
        {placeDetails.opening_hours.weekday_text.map(
          (text: string, index: number) => (
            <Fragment key={index}>
              <br />
              {text}
            </Fragment>
          ),
        )}
      </p>
    )}
    {placeDetails.formatted_phone_number && (
      <p>
        <strong className="font-bold">Teléfono:</strong>{" "}
        {placeDetails.formatted_phone_number}
      </p>
    )}
    {placeDetails.website && (
      <p className="font-normal">
        <strong className="inline-flex flex-1 justify-center gap-1 font-bold">
          Sitio Web
          <LinkIcon />
        </strong>
        <a
          className="line-clamp-1 text-ellipsis text-bittersweet-400 hover:underline dark:text-cerise-red-600"
          href={placeDetails.website}
          target="_blank"
          rel="noopener noreferrer"
        >
          {placeDetails.website}
        </a>
      </p>
    )}
  </div>
);

export default InfoWindowContent;
