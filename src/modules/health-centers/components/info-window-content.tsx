import { Fragment } from "react";

import { LinkIcon } from "@/modules/icons/action";

const InfoWindowContent = ({ placeDetails }: any) => (
  <div className="flex flex-col mt-4 gap-2 text-base-color-h dark:text-base-color-dark-h">
    <h2 className="text-xl font-bold font-dmsans absolute top-0 left-0 m-4">
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
          )
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
        <strong className="font-bold inline-flex flex-1 justify-center gap-1">
          Sitio Web
          <LinkIcon />
        </strong>
        <a
          className="text-bittersweet-400 dark:text-cerise-red-600 hover:underline text-ellipsis line-clamp-1"
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
