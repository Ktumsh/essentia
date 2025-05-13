import type { IconSvgProps } from "@/lib/types";

const AdditionalIcon = (props: IconSvgProps) => {
  return (
    <svg
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      {...props}
    >
      <g fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M4 11.5V5.712c0-.662 0-.993.055-1.268C4.3 3.23 5.312 2.28 6.607 2.052C6.9 2 7.254 2 7.96 2c.31 0 .464 0 .612.013c.641.056 1.25.292 1.745.677a7 7 0 0 1 .443.397l.44.413c.653.612.979.918 1.37 1.122q.323.168.678.263c.43.115.892.115 1.815.115h.299c2.106 0 3.158 0 3.843.577q.095.08.18.168C20 6.387 20 7.375 20 9.348V11.5" />
        <path strokeLinecap="round" d="M10 17h4" />
        <path d="M3.477 17.484C3 14.768 2.76 13.41 3.339 12.433q.223-.376.54-.67C4.704 11 6.038 11 8.705 11h6.59c2.667 0 4 0 4.826.763q.316.294.54.67c.578.977.34 2.335-.138 5.05c-.343 1.956-.515 2.934-1.11 3.582a3 3 0 0 1-.515.445c-.723.49-1.683.49-3.603.49h-6.59c-1.92 0-2.88 0-3.603-.49a3 3 0 0 1-.515-.445c-.595-.648-.767-1.626-1.11-3.581Z" />
      </g>
    </svg>
  );
};

const AdditionalFillIcon = (props: IconSvgProps) => {
  return (
    <svg
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M3.358 12.779c-.61.941-.358 2.25.145 4.868c.363 1.885.544 2.827 1.172 3.452q.246.244.544.429C5.982 22 6.995 22 9.022 22h6.956c2.027 0 3.04 0 3.803-.472q.298-.185.544-.429c.628-.625.81-1.567 1.172-3.452c.503-2.618.755-3.927.145-4.868a3 3 0 0 0-.57-.646c-.87-.735-2.279-.735-5.094-.735H9.022c-2.815 0-4.223 0-5.094.735a3 3 0 0 0-.57.646m6.337 4.402c0-.4.343-.723.765-.723h4.08c.422 0 .765.323.765.723s-.343.723-.765.723h-4.08c-.422 0-.765-.324-.765-.723"
        clipRule="evenodd"
      />
      <path
        fill="currentColor"
        d="M3.576 12.485q.16-.19.352-.352c.87-.735 2.279-.735 5.094-.735h6.956c2.815 0 4.223 0 5.094.735q.192.162.353.353v-2.73c0-.91 0-1.663-.086-2.264c-.09-.635-.286-1.197-.755-1.66a3 3 0 0 0-.242-.214c-.512-.408-1.125-.575-1.82-.652c-.669-.074-1.512-.074-2.545-.074h-.353c-.982 0-1.334-.006-1.653-.087a2.7 2.7 0 0 1-.536-.196c-.284-.14-.532-.351-1.227-.968l-.474-.42c-.2-.176-.335-.296-.48-.403a4.3 4.3 0 0 0-2.183-.803A8 8 0 0 0 8.414 2h-.117c-.64 0-1.063 0-1.43.061c-1.605.268-2.903 1.39-3.22 2.875c-.071.337-.071.724-.07 1.283z"
        opacity="0.5"
      />
    </svg>
  );
};

const AIIcon = (props: IconSvgProps) => {
  return (
    <svg
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      {...props}
    >
      <g fill="none">
        <path
          fill="currentColor"
          d="m10.87 21.51l.645.382zm.259-.438l-.646-.382zm-2.258 0l.646-.382zm.26.438l-.646.382zm-6.827-4.38l.693-.286zm3.985 2.455l.024-.75zm-1.82-.29l-.287.693zm13.226-2.164l.693.287zm-3.984 2.454l-.024-.75zm1.82-.29l.287.693zM16.09 6.59l.392-.639zm1.32 1.321l.64-.392zM3.91 6.59l-.392-.64zM2.59 7.91l-.64-.392zm5.326 11.912l-.381.646zm3.599 2.07l.26-.438l-1.292-.764l-.26.438zm-3.29-.438l.26.438l1.291-.764l-.26-.438zm1.999-.326a.25.25 0 0 1-.224.122a.25.25 0 0 1-.224-.122l-1.29.764c.676 1.144 2.352 1.144 3.029 0zM8.8 6.75h2.4v-1.5H8.8zm8.45 6.05v.8h1.5v-.8zm-14.5.8v-.8h-1.5v.8zm-1.5 0c0 .922 0 1.65.04 2.24c.04.596.125 1.104.322 1.578l1.385-.574c-.108-.261-.175-.587-.21-1.106c-.037-.527-.037-1.196-.037-2.138zm5.063 5.235c-.792-.025-1.223-.094-1.557-.232l-.574 1.385c.597.248 1.255.32 2.083.347zm-4.701-1.417a4.75 4.75 0 0 0 2.57 2.57l.574-1.385a3.25 3.25 0 0 1-1.759-1.76zM17.25 13.6c0 .942 0 1.611-.036 2.138c-.036.52-.103.845-.211 1.106l1.385.574c.197-.474.281-.982.322-1.578c.04-.59.04-1.318.04-2.24zm-3.515 6.735c.828-.027 1.486-.1 2.083-.347l-.574-1.385c-.335.138-.765.207-1.557.232zm3.268-3.491a3.25 3.25 0 0 1-1.76 1.759l.575 1.385a4.75 4.75 0 0 0 2.57-2.57zM11.2 6.75c1.324 0 2.264 0 2.995.07c.72.069 1.16.199 1.503.409l.784-1.279c-.619-.38-1.315-.544-2.145-.623c-.818-.078-1.842-.077-3.137-.077zm7.55 6.05c0-1.295 0-2.319-.077-3.137c-.079-.83-.244-1.526-.623-2.145l-1.279.784c.21.343.34.783.409 1.503c.07.73.07 1.671.07 2.995zm-3.052-5.571a3.25 3.25 0 0 1 1.073 1.073l1.279-.784a4.75 4.75 0 0 0-1.568-1.568zM8.8 5.25c-1.295 0-2.319 0-3.137.077c-.83.079-1.526.244-2.145.623l.784 1.279c.343-.21.783-.34 1.503-.409c.73-.07 1.671-.07 2.995-.07zM2.75 12.8c0-1.324 0-2.264.07-2.995c.069-.72.199-1.16.409-1.503L1.95 7.518c-.38.619-.544 1.315-.623 2.145c-.078.818-.077 1.842-.077 3.137zm.768-6.85A4.75 4.75 0 0 0 1.95 7.518l1.279.784a3.25 3.25 0 0 1 1.073-1.073zm5.999 14.74c-.201-.34-.377-.638-.548-.874a2.2 2.2 0 0 0-.67-.64l-.764 1.292c.046.027.11.077.22.23c.12.165.256.393.47.756zm-3.252-.355c.446.014.73.024.947.05c.204.025.281.058.323.083l.763-1.291c-.29-.171-.594-.243-.905-.28c-.298-.037-.661-.048-1.08-.062zm5.51 1.119c.214-.363.35-.591.47-.756c.11-.153.174-.203.22-.23l-.763-1.291a2.2 2.2 0 0 0-.67.64c-.172.235-.348.534-.549.873zm1.912-2.619c-.419.014-.782.025-1.08.061c-.31.038-.616.11-.905.28l.763 1.292c.042-.025.119-.058.323-.083c.216-.026.501-.036.947-.05z"
        />
        <path
          fill="currentColor"
          d="m21.715 12.435l.692.287zm-2.03 2.03l.287.693zm.524-11.912l-.392.64zm1.238 1.238l.64-.392zM8.791 2.553l-.392-.64zM7.553 3.79l-.64-.392zm5.822-1.041h2.25v-1.5h-2.25zm7.875 5.625v.75h1.5v-.75zm0 .75c0 .884 0 1.51-.034 2c-.033.486-.096.785-.194 1.023l1.385.574c.187-.451.267-.933.305-1.494c.038-.554.038-1.24.038-2.103zm-.228 3.023a3 3 0 0 1-1.624 1.624l.574 1.386a4.5 4.5 0 0 0 2.435-2.436zM15.625 2.75c1.242 0 2.12 0 2.804.066c.671.064 1.075.184 1.388.376l.784-1.279c-.588-.36-1.249-.516-2.03-.59c-.77-.074-1.733-.073-2.946-.073zm7.125 5.625c0-1.213 0-2.175-.073-2.946c-.074-.781-.23-1.442-.59-2.03l-1.28.784c.193.313.313.717.377 1.388c.065.683.066 1.562.066 2.804zm-2.933-5.183a3 3 0 0 1 .99.99l1.28-.783A4.5 4.5 0 0 0 20.6 1.913zM13.375 1.25c-1.213 0-2.175 0-2.946.072c-.781.075-1.442.23-2.03.591l.783 1.28c.314-.193.718-.313 1.39-.377c.682-.065 1.56-.066 2.803-.066zm-4.976.663A4.5 4.5 0 0 0 6.913 3.4l1.279.784a3 3 0 0 1 .99-.99zM7.782 6.04c.05-.96.175-1.473.41-1.856L6.913 3.4c-.437.713-.576 1.538-.629 2.562zm10.243 9.446c.767-.026 1.384-.094 1.947-.327l-.574-1.386c-.302.125-.694.19-1.423.214z"
        />
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M6.51 13h.008M10 13h.009m3.482 0h.009"
        />
      </g>
    </svg>
  );
};

const AIFillIcon = (props: IconSvgProps) => {
  return (
    <svg
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="m10.404 22.48l.275-.465c.44-.745.66-1.117 1.012-1.325c.351-.207.81-.222 1.725-.252c.859-.027 1.436-.102 1.93-.306a4.24 4.24 0 0 0 2.295-2.296c.323-.779.323-1.767.323-3.743v-.848c0-2.777 0-4.165-.625-5.185c-.35-.57-.83-1.05-1.4-1.4c-1.02-.625-2.408-.625-5.185-.625H8.21c-2.777 0-4.165 0-5.185.625c-.57.35-1.05.83-1.4 1.4C1 9.08 1 10.468 1 13.245v.848c0 1.976 0 2.964.323 3.744a4.24 4.24 0 0 0 2.295 2.295c.494.204 1.07.28 1.93.306c.916.03 1.374.045 1.725.252c.35.208.571.58 1.012 1.325l.275.465c.41.692 1.434.692 1.844 0m2.789-7.963a1.06 1.06 0 1 0 0-2.12a1.06 1.06 0 0 0 0 2.12m-2.65-1.06a1.06 1.06 0 1 1-2.121 0a1.06 1.06 0 0 1 2.12 0m-4.772 1.06a1.06 1.06 0 1 0 0-2.12a1.06 1.06 0 0 0 0 2.12"
        clipRule="evenodd"
      />
      <path
        fill="currentColor"
        d="M15.486 1c1.267 0 2.274 0 3.082.077c.829.079 1.53.244 2.153.626a4.8 4.8 0 0 1 1.575 1.575c.383.624.548 1.325.627 2.153c.076.808.076 1.816.076 3.082v.866c0 .901 0 1.619-.04 2.2c-.04.595-.125 1.106-.323 1.584a4.77 4.77 0 0 1-2.67 2.617q-.21.082-.368.135h-1.65c.016-.499.016-1.093.016-1.822v-.848c0-2.777 0-4.165-.625-5.185c-.35-.57-.83-1.05-1.4-1.4c-1.02-.625-2.408-.625-5.185-.625H8.21c-.986 0-1.796 0-2.478.028v-1.65q.05-.17.13-.396q.133-.389.346-.739a4.8 4.8 0 0 1 1.576-1.575c.624-.382 1.324-.547 2.153-.626C10.745 1 11.752 1 13.019 1z"
        opacity="0.5"
      />
    </svg>
  );
};

const HomeIcon = (props: IconSvgProps) => {
  return (
    <svg
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      {...props}
    >
      <g fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M2 12.204c0-2.289 0-3.433.52-4.381c.518-.949 1.467-1.537 3.364-2.715l2-1.241C9.889 2.622 10.892 2 12 2s2.11.622 4.116 1.867l2 1.241c1.897 1.178 2.846 1.766 3.365 2.715S22 9.915 22 12.203v1.522c0 3.9 0 5.851-1.172 7.063S17.771 22 14 22h-4c-3.771 0-5.657 0-6.828-1.212S2 17.626 2 13.725z" />
        <path strokeLinecap="round" d="M9 16c.85.63 1.885 1 3 1s2.15-.37 3-1" />
      </g>
    </svg>
  );
};

const HomeFillIcon = (props: IconSvgProps) => {
  return (
    <svg
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M2.52 7.823C2 8.77 2 9.915 2 12.203v1.522c0 3.9 0 5.851 1.172 7.063S6.229 22 10 22h4c3.771 0 5.657 0 6.828-1.212S22 17.626 22 13.725v-1.521c0-2.289 0-3.433-.52-4.381c-.518-.949-1.467-1.537-3.364-2.715l-2-1.241C14.111 2.622 13.108 2 12 2s-2.11.622-4.116 1.867l-2 1.241C3.987 6.286 3.038 6.874 2.519 7.823m6.927 7.575a.75.75 0 1 0-.894 1.204A5.77 5.77 0 0 0 12 17.75a5.77 5.77 0 0 0 3.447-1.148a.75.75 0 1 0-.894-1.204A4.27 4.27 0 0 1 12 16.25a4.27 4.27 0 0 1-2.553-.852"
        clipRule="evenodd"
      />
    </svg>
  );
};

const HealthCentersIcon = (props: IconSvgProps) => {
  return (
    <svg
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      {...props}
    >
      <g fill="none">
        <path
          stroke="currentColor"
          strokeWidth="1.5"
          d="M12 22c-4.714 0-7.071 0-8.536-1.465C2 19.072 2 16.714 2 12s0-7.071 1.464-8.536C4.93 2 7.286 2 12 2s7.071 0 8.535 1.464C22 4.93 22 7.286 22 12s0 7.071-1.465 8.535C19.072 22 16.714 22 12 22Z"
        />
        <path
          stroke="currentColor"
          strokeWidth="1.5"
          d="M5.5 8.757C5.5 6.958 7.067 5.5 9 5.5s3.5 1.458 3.5 3.257c0 1.785-1.117 3.868-2.86 4.613a1.64 1.64 0 0 1-1.28 0c-1.743-.745-2.86-2.828-2.86-4.613Z"
        />
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="2"
          d="m14 14l6.5 6.5M14 14l-7.605 7.605M14 14l7.607-7.606"
        />
        <path fill="currentColor" d="M10 9a1 1 0 1 1-2 0a1 1 0 0 1 2 0" />
      </g>
    </svg>
  );
};

const HealthCentersFillIcon = (props: IconSvgProps) => {
  return (
    <svg
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M12 2c4.714 0 7.071 0 8.535 1.464c.504.504.835 1.114 1.052 1.889L5.353 21.587c-.775-.217-1.385-.548-1.889-1.052C2 19.072 2 16.714 2 12s0-7.071 1.464-8.536C4.93 2 7.286 2 12 2M5.5 8.757c0 1.785 1.117 3.868 2.86 4.613c.406.173.874.173 1.28 0c1.743-.745 2.86-2.828 2.86-4.613C12.5 6.958 10.933 5.5 9 5.5S5.5 6.958 5.5 8.757"
        clipRule="evenodd"
      />
      <path
        fill="currentColor"
        d="M10.5 9a1.5 1.5 0 1 1-3 0a1.5 1.5 0 0 1 3 0"
      />
      <path
        fill="currentColor"
        d="M21.89 7.172C22 8.433 22 10.006 22 12c0 4.134 0 6.455-.987 7.951L15.06 14zm-1.938 13.84l-5.951-5.951l-6.83 6.828c1.262.111 2.835.111 4.83.111c4.134 0 6.455 0 7.951-.988"
        opacity="0.5"
      />
    </svg>
  );
};

const HealthIcon = (props: IconSvgProps) => {
  return (
    <svg
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 48 48"
      {...props}
    >
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M24 6a4 4 0 1 0 0 8a4 4 0 0 0 0-8m-6 4a6 6 0 1 1 12 0a6 6 0 0 1-12 0m-2.692 9.462A4 4 0 0 1 19 17h10a4 4 0 0 1 3.692 2.462l2.5 6c1.033 2.477-.618 5.193-3.192 5.508v.922a1 1 0 0 0 .47.848l5.548 3.467A4.217 4.217 0 0 1 35.783 44h-23.57a4.213 4.213 0 0 1-2.223-7.792l5.588-3.47a1 1 0 0 0 .472-.85v-.913c-2.603-.285-4.281-3.02-3.242-5.514zM18.05 31v.888a3 3 0 0 1-1.417 2.548l-5.587 3.47A2.213 2.213 0 0 0 12.213 42H30a1 1 0 0 0 1-1v-.13a1 1 0 0 0-.933-.997l-13.084-.875a1 1 0 0 1 .134-1.996l13.083.875a3 3 0 0 1 2.8 2.994V41c0 .35-.06.687-.17 1h2.953a2.217 2.217 0 0 0 1.175-4.097l-5.548-3.468A3 3 0 0 1 30 31.891V31h-2.757a4 4 0 0 1-2.829-1.172L24 29.414l-.414.414A4 4 0 0 1 20.757 31zM25 27.586l.828.828a2 2 0 0 0 1.415.586H31.5a2 2 0 0 0 1.846-2.77l-2.5-6A2 2 0 0 0 29 19H19a2 2 0 0 0-1.846 1.23l-2.5 6A2 2 0 0 0 16.5 29h4.257a2 2 0 0 0 1.415-.586l.828-.828v-2.32c-.226.13-.43.308-.6.534l-.6.8a1 1 0 0 1-.8.4h-3a1 1 0 0 1-.894-1.447l1-2a1 1 0 1 1 1.788.894l-.276.553h.882l.3-.4c1.6-2.133 4.8-2.133 6.4 0l.3.4h.882l-.276-.553a1 1 0 1 1 1.788-.894l1 2A1 1 0 0 1 30 27h-3a1 1 0 0 1-.8-.4l-.6-.8a2 2 0 0 0-.6-.534z"
        clipRule="evenodd"
      />
    </svg>
  );
};

const HealthFillIcon = (props: IconSvgProps) => {
  return (
    <svg
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 48 48"
      {...props}
    >
      <path
        fill="currentColor"
        d="M29 10a5 5 0 1 1-10 0a5 5 0 0 1 10 0m2 33a1 1 0 0 1-1 1H12.856a2.856 2.856 0 0 1-1.507-5.282l5.284-3.282a3 3 0 0 0 1.417-2.548V32h2.374a4 4 0 0 0 2.828-1.172l.748-.747l.747.747A4 4 0 0 0 27.577 32H30v.892a3 3 0 0 0 1.41 2.543l5.246 3.279A2.86 2.86 0 0 1 35.14 44h-2.31c.11-.313.17-.65.17-1v-.25a3 3 0 0 0-2.602-2.973l-13.215-1.768a1 1 0 0 0-.266 1.982l13.216 1.768a1 1 0 0 1 .867.991zm-4.838-13.586L25 28.252V24.51q.224.129.414.318l1.879 1.88A1 1 0 0 0 28 27h3a1 1 0 0 0 .894-1.447l-1-2a1 1 0 1 0-1.788.894l.276.553h-.968l-1.586-1.586a4 4 0 0 0-5.656 0L19.586 25h-.968l.276-.553a1 1 0 1 0-1.788-.894l-1 2A1 1 0 0 0 17 27h3a1 1 0 0 0 .707-.293l1.879-1.879q.191-.189.414-.318v3.742l-1.162 1.162a2 2 0 0 1-1.414.586h-6.038a2 2 0 0 1-1.864-2.725l3.004-7.725A4 4 0 0 1 19.254 17h9.492a4 4 0 0 1 3.728 2.55l3.005 7.725A2 2 0 0 1 33.613 30h-6.038a2 2 0 0 1-1.414-.586"
      />
    </svg>
  );
};

const ExerciseIcon = (props: IconSvgProps) => {
  return (
    <svg
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 512 512"
      {...props}
    >
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="32"
        d="M352.92 80C288 80 256 144 256 144s-32-64-96.92-64c-52.76 0-94.54 44.14-95.08 96.81c-1.1 109.33 86.73 187.08 183 252.42a16 16 0 0 0 18 0c96.26-65.34 184.09-143.09 183-252.42c-.54-52.67-42.32-96.81-95.08-96.81"
      />
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="32"
        d="M48 256h112l48-96l48 160l48-96l32 64h128"
      />
    </svg>
  );
};

const ExerciseFillIcon = (props: IconSvgProps) => {
  return (
    <svg
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 512 512"
      {...props}
    >
      <path
        fill="currentColor"
        d="M193.69 152.84a16 16 0 0 1 29.64 2.56l36.4 121.36l30-59.92a16 16 0 0 1 28.62 0L345.89 272h96.76A213.1 213.1 0 0 0 464 176.65C463.37 114.54 413.54 64 352.92 64c-48.09 0-80 29.54-96.92 51c-16.88-21.49-48.83-51-96.92-51C98.46 64 48.63 114.54 48 176.65A211.1 211.1 0 0 0 56.93 240h93.18Z"
      />
      <path
        fill="currentColor"
        d="M321.69 295.16L304 259.78l-33.69 67.38A16 16 0 0 1 256 336q-.67 0-1.38-.06a16 16 0 0 1-14-11.34l-36.4-121.36l-30 59.92A16 16 0 0 1 160 272H69.35q14 29.29 37.27 57.66c18.77 22.88 52.8 59.46 131.39 112.81a31.84 31.84 0 0 0 36 0c78.59-53.35 112.62-89.93 131.39-112.81a317 317 0 0 0 19-25.66H336a16 16 0 0 1-14.31-8.84M464 272h-21.35a260 260 0 0 1-18.25 32H464a16 16 0 0 0 0-32M48 240a16 16 0 0 0 0 32h21.35a225 225 0 0 1-12.42-32Z"
      />
    </svg>
  );
};

const NutritionIcon = (props: IconSvgProps) => {
  return (
    <svg
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 512 512"
      {...props}
    >
      <path
        fill="none"
        stroke="currentColor"
        strokeMiterlimit="10"
        strokeWidth="32"
        d="M352 128c-32.26-2.89-64 16-96 16s-63.75-19-96-16c-64 6-96 64-96 160c0 80 64 192 111.2 192s51.94-24 80.8-24s33.59 24 80.8 24S448 368 448 288c0-96-29-154-96-160Z"
      />
      <path
        fill="currentColor"
        d="M323.92 83.14c-21 21-45.66 27-58.82 28.79a8 8 0 0 1-9.1-8.73a97.6 97.6 0 0 1 28.61-59.33c22-22 46-26.9 58.72-27.85a8 8 0 0 1 8.67 8.92a98 98 0 0 1-28.08 58.2"
      />
      <ellipse cx="216" cy="304" fill="currentColor" rx="24" ry="48" />
      <ellipse cx="296" cy="304" fill="currentColor" rx="24" ry="48" />
    </svg>
  );
};

const NutritionFillIcon = (props: IconSvgProps) => {
  return (
    <svg
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 512 512"
      {...props}
    >
      <path
        fill="currentColor"
        d="M438.71 159.43c-17.6-28.31-45.5-43.8-85.28-47.37c-22.82-2-50.23 4.94-72.25 10.55C271.26 125.14 260 128 256 128s-15.18-2.86-25-5.39c-22.08-5.65-49.56-12.69-72.45-10.54c-38.53 3.61-66 19.19-84 47.62S48 229 48 288c0 61.28 29.53 114.58 47.13 140.89C116.82 461.34 149.25 496 175.2 496c18.57 0 34.12-7.23 47.82-13.64C243 473 256 472 256 472s11 0 31.94 10.11C301.65 488.73 317.3 496 336.8 496c26.58 0 59.08-34.69 80.63-67.15C434.82 402.65 464 349.52 464 288c0-60-8-100.83-25.29-128.57M216 352c-13.25 0-24-21.49-24-48s10.75-48 24-48s24 21.49 24 48s-10.75 48-24 48m80 0c-13.25 0-24-21.49-24-48s10.75-48 24-48s24 21.49 24 48s-10.75 48-24 48"
      />
      <path
        fill="currentColor"
        d="M323.72 82.76C353.68 52.82 352 16.18 352 16.14s-35.77-3.76-67.23 27.67S256.06 112 256.06 112s37.68.71 67.66-29.24"
      />
    </svg>
  );
};

const WellbeingIcon = (props: IconSvgProps) => {
  return (
    <svg
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 14 14"
      {...props}
    >
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M11.28 9.34a1.91 1.91 0 0 0 0-2.77a2.07 2.07 0 0 0-2.85 0L7 8L5.57 6.57a2.07 2.07 0 0 0-2.85 0a1.91 1.91 0 0 0 0 2.77L7 13.5zM7 4.5a2 2 0 1 0 0-4a2 2 0 0 0 0 4"
      />
    </svg>
  );
};

const WellbeingFillIcon = (props: IconSvgProps) => {
  return (
    <svg
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 14 14"
      {...props}
    >
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M4.685 2.422a2.315 2.315 0 1 1 4.63 0a2.315 2.315 0 0 1-4.63 0M2.446 6.214a2.536 2.536 0 0 1 3.492 0l.01.01L7 7.276l1.053-1.052l.01-.01a2.536 2.536 0 0 1 3.49 0a2.38 2.38 0 0 1 .003 3.448l-4.208 4.09a.5.5 0 0 1-.697 0l-4.207-4.09a2.38 2.38 0 0 1 .002-3.447Z"
        clipRule="evenodd"
      />
    </svg>
  );
};

const SexualityIcon = (props: IconSvgProps) => {
  return (
    <svg
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 16 16"
      {...props}
    >
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M2.854 15.854A.5.5 0 0 1 2 15.5V14H.5a.5.5 0 0 1-.354-.854l1.5-1.5A.5.5 0 0 1 2 11.5h1.793l.53-.53c-.771-.802-1.328-1.58-1.704-2.32c-.798-1.575-.775-2.996-.213-4.092C3.426 2.565 6.18 1.809 8 3.233c1.25-.98 2.944-.928 4.212-.152L13.292 2L12.147.854A.5.5 0 0 1 12.5 0h3a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-.854.354L14 2.707l-1.006 1.006c.236.248.44.531.6.845c.562 1.096.585 2.517-.213 4.092c-.793 1.563-2.395 3.288-5.105 5.08L8 13.912l-.276-.182a22 22 0 0 1-2.685-2.062l-.539.54V14a.5.5 0 0 1-.146.354zm2.893-4.894A20.4 20.4 0 0 0 8 12.71c2.456-1.666 3.827-3.207 4.489-4.512c.679-1.34.607-2.42.215-3.185c-.817-1.595-3.087-2.054-4.346-.761L8 4.62l-.358-.368c-1.259-1.293-3.53-.834-4.346.761c-.392.766-.464 1.845.215 3.185c.323.636.815 1.33 1.519 2.065l1.866-1.867a.5.5 0 1 1 .708.708z"
      />
    </svg>
  );
};

const SexualityFillIcon = (props: IconSvgProps) => {
  return (
    <svg
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 16 16"
      {...props}
    >
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M2.854 15.854A.5.5 0 0 1 2 15.5V14H.5a.5.5 0 0 1-.354-.854l1.5-1.5A.5.5 0 0 1 2 11.5h1.793l3.103-3.104a.5.5 0 1 1 .708.708L4.5 12.207V14a.5.5 0 0 1-.146.354zM16 3.5a.5.5 0 0 1-.854.354L14 2.707l-1.006 1.006c.236.248.44.531.6.845c.562 1.096.585 2.517-.213 4.092c-.793 1.563-2.395 3.288-5.105 5.08L8 13.912l-.276-.182A24 24 0 0 1 5.8 12.323L8.31 9.81a1.5 1.5 0 0 0-2.122-2.122L3.657 10.22a9 9 0 0 1-1.039-1.57c-.798-1.576-.775-2.997-.213-4.093C3.426 2.565 6.18 1.809 8 3.233c1.25-.98 2.944-.928 4.212-.152L13.292 2L12.147.854A.5.5 0 0 1 12.5 0h3a.5.5 0 0 1 .5.5z"
      />
    </svg>
  );
};

const ForAllAgesIcon = (props: IconSvgProps) => {
  return (
    <svg
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M12 2.75a1.25 1.25 0 1 0 0 2.5a1.25 1.25 0 0 0 0-2.5M9.25 4a2.75 2.75 0 1 1 5.5 0a2.75 2.75 0 0 1-5.5 0m7.74 3.164a2.282 2.282 0 0 1 1.2 4.397l-2.176.725a8 8 0 0 0-.338.12a.25.25 0 0 0-.115.243l.018.06c.021.062.052.143.104.278l1.247 3.242a2.223 2.223 0 0 1-4.005 1.9L12 16.513l-.925 1.618A2.223 2.223 0 0 1 7.07 16.23l1.247-3.242a9 9 0 0 0 .104-.277l.018-.06a.25.25 0 0 0-.115-.244l-.058-.024a8 8 0 0 0-.28-.096L5.81 11.56a2.282 2.282 0 0 1 1.2-4.397l1.897.406l.206.044a14.25 14.25 0 0 0 5.772 0c.05-.01.1-.02.206-.044zm1.26 2.232c0-.499-.46-.87-.946-.765l-1.9.407l-.214.045a15.75 15.75 0 0 1-6.593-.045l-1.9-.407a.782.782 0 0 0-.412 1.507l2.175.725l.055.018c.205.068.42.139.595.248c.59.363.909 1.04.815 1.726c-.028.205-.11.415-.187.617l-.021.053l-1.247 3.242a.723.723 0 0 0 1.303.619l1.576-2.758a.75.75 0 0 1 1.302 0l1.576 2.758a.723.723 0 0 0 1.303-.619l-1.247-3.242l-.02-.053c-.079-.202-.16-.412-.188-.617a1.75 1.75 0 0 1 .815-1.726c.176-.11.39-.18.595-.248l.055-.018l2.175-.725a.78.78 0 0 0 .535-.742M5.216 14.163a.75.75 0 0 1-.333 1.007c-1.52.765-2.133 1.625-2.133 2.33c0 .764.724 1.705 2.487 2.498C6.929 20.76 9.32 21.25 12 21.25s5.071-.49 6.763-1.252c1.763-.793 2.487-1.734 2.487-2.498c0-.705-.612-1.565-2.133-2.33a.75.75 0 1 1 .674-1.34c1.646.828 2.959 2.07 2.959 3.67c0 1.722-1.515 3.03-3.371 3.866c-1.927.867-4.537 1.384-7.379 1.384s-5.452-.517-7.379-1.384C2.765 20.53 1.25 19.222 1.25 17.5c0-1.6 1.313-2.842 2.96-3.67a.75.75 0 0 1 1.006.333"
        clipRule="evenodd"
      />
    </svg>
  );
};

const ForAllAgesFillIcon = (props: IconSvgProps) => {
  return (
    <svg
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M9.25 4a2.75 2.75 0 1 1 5.5 0a2.75 2.75 0 0 1-5.5 0"
        clipRule="evenodd"
      />
      <path
        fill="currentColor"
        d="m8.223 11.574l-2.175-.725a1.532 1.532 0 0 1 .805-2.952l1.898.407l.21.044a15 15 0 0 0 6.288-.044l1.897-.407a1.532 1.532 0 0 1 .806 2.952l-2.175.725c-.263.088-.394.132-.493.193a1 1 0 0 0-.466.986c.016.115.066.244.165.503l1.247 3.242a1.473 1.473 0 0 1-2.654 1.26L12 15l-1.576 2.757a1.473 1.473 0 0 1-2.654-1.26l1.247-3.241c.1-.259.149-.388.165-.503a1 1 0 0 0-.466-.986c-.099-.061-.23-.105-.493-.193"
      />
      <path
        fill="currentColor"
        d="M12 22c5.523 0 10-2.015 10-4.5c0-1.722-2.15-3.218-5.306-3.975l.936 2.434c.749 1.948-.688 4.04-2.775 4.04a2.97 2.97 0 0 1-2.581-1.497l-.274-.48l-.274.48A2.97 2.97 0 0 1 9.147 20c-2.087 0-3.525-2.093-2.776-4.041l.936-2.434C4.149 14.282 2 15.778 2 17.5C2 19.985 6.477 22 12 22"
      />
    </svg>
  );
};

const SunLoopIcon = (props: IconSvgProps) => {
  return (
    <svg
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 24 24"
      {...props}
    >
      <g
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      >
        <path
          fill="currentColor"
          fillOpacity="0"
          strokeDasharray="36"
          strokeDashoffset="36"
          d="M12 7c2.76 0 5 2.24 5 5c0 2.76 -2.24 5 -5 5c-2.76 0 -5 -2.24 -5 -5c0 -2.76 2.24 -5 5 -5"
        >
          <animate
            fill="freeze"
            attributeName="fill-opacity"
            begin="1s"
            dur="0.5s"
            values="0;1"
          />
          <animate
            fill="freeze"
            attributeName="stroke-dashoffset"
            dur="0.5s"
            values="36;0"
          />
        </path>
        <path
          strokeDasharray="2"
          strokeDashoffset="2"
          d="M12 19v1M19 12h1M12 5v-1M5 12h-1"
          opacity="0"
        >
          <animate
            fill="freeze"
            attributeName="d"
            begin="0.6s"
            dur="0.2s"
            values="M12 19v1M19 12h1M12 5v-1M5 12h-1;M12 21v1M21 12h1M12 3v-1M3 12h-1"
          />
          <animate
            fill="freeze"
            attributeName="stroke-dashoffset"
            begin="0.6s"
            dur="0.2s"
            values="2;0"
          />
          <set fill="freeze" attributeName="opacity" begin="0.6s" to="1" />
          <animateTransform
            attributeName="transform"
            dur="30s"
            repeatCount="indefinite"
            type="rotate"
            values="0 12 12;360 12 12"
          />
        </path>
        <path
          strokeDasharray="2"
          strokeDashoffset="2"
          d="M17 17l0.5 0.5M17 7l0.5 -0.5M7 7l-0.5 -0.5M7 17l-0.5 0.5"
          opacity="0"
        >
          <animate
            fill="freeze"
            attributeName="d"
            begin="0.8s"
            dur="0.2s"
            values="M17 17l0.5 0.5M17 7l0.5 -0.5M7 7l-0.5 -0.5M7 17l-0.5 0.5;M18.5 18.5l0.5 0.5M18.5 5.5l0.5 -0.5M5.5 5.5l-0.5 -0.5M5.5 18.5l-0.5 0.5"
          />
          <animate
            fill="freeze"
            attributeName="stroke-dashoffset"
            begin="0.8s"
            dur="0.2s"
            values="2;0"
          />
          <set fill="freeze" attributeName="opacity" begin="0.8s" to="1" />
          <animateTransform
            attributeName="transform"
            dur="30s"
            repeatCount="indefinite"
            type="rotate"
            values="0 12 12;360 12 12"
          />
        </path>
      </g>
    </svg>
  );
};

const MoonLoopIcon = (props: IconSvgProps) => {
  return (
    <svg
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 24 24"
      {...props}
    >
      <g
        fill="none"
        stroke="currentColor"
        strokeDasharray="4"
        strokeDashoffset="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M13 4h1.5M13 4h-1.5M13 4v1.5M13 4v-1.5">
          <animate
            id="lineMdSunnyFilledLoopToMoonFilledAltLoopTransition0"
            fill="freeze"
            attributeName="stroke-dashoffset"
            begin="0.6s;lineMdSunnyFilledLoopToMoonFilledAltLoopTransition0.begin+6s"
            dur="0.4s"
            values="4;0"
          />
          <animate
            fill="freeze"
            attributeName="stroke-dashoffset"
            begin="lineMdSunnyFilledLoopToMoonFilledAltLoopTransition0.begin+2s;lineMdSunnyFilledLoopToMoonFilledAltLoopTransition0.begin+4s"
            dur="0.4s"
            values="4;0"
          />
          <animate
            fill="freeze"
            attributeName="stroke-dashoffset"
            begin="lineMdSunnyFilledLoopToMoonFilledAltLoopTransition0.begin+1.2s;lineMdSunnyFilledLoopToMoonFilledAltLoopTransition0.begin+3.2s;lineMdSunnyFilledLoopToMoonFilledAltLoopTransition0.begin+5.2s"
            dur="0.4s"
            values="0;4"
          />
          <set
            fill="freeze"
            attributeName="d"
            begin="lineMdSunnyFilledLoopToMoonFilledAltLoopTransition0.begin+1.8s"
            to="M12 5h1.5M12 5h-1.5M12 5v1.5M12 5v-1.5"
          />
          <set
            fill="freeze"
            attributeName="d"
            begin="lineMdSunnyFilledLoopToMoonFilledAltLoopTransition0.begin+3.8s"
            to="M12 4h1.5M12 4h-1.5M12 4v1.5M12 4v-1.5"
          />
          <set
            fill="freeze"
            attributeName="d"
            begin="lineMdSunnyFilledLoopToMoonFilledAltLoopTransition0.begin+5.8s"
            to="M13 4h1.5M13 4h-1.5M13 4v1.5M13 4v-1.5"
          />
        </path>
        <path d="M19 11h1.5M19 11h-1.5M19 11v1.5M19 11v-1.5">
          <animate
            id="lineMdSunnyFilledLoopToMoonFilledAltLoopTransition1"
            fill="freeze"
            attributeName="stroke-dashoffset"
            begin="1s;lineMdSunnyFilledLoopToMoonFilledAltLoopTransition1.begin+6s"
            dur="0.4s"
            values="4;0"
          />
          <animate
            fill="freeze"
            attributeName="stroke-dashoffset"
            begin="lineMdSunnyFilledLoopToMoonFilledAltLoopTransition1.begin+2s;lineMdSunnyFilledLoopToMoonFilledAltLoopTransition1.begin+4s"
            dur="0.4s"
            values="4;0"
          />
          <animate
            fill="freeze"
            attributeName="stroke-dashoffset"
            begin="lineMdSunnyFilledLoopToMoonFilledAltLoopTransition1.begin+1.2s;lineMdSunnyFilledLoopToMoonFilledAltLoopTransition1.begin+3.2s;lineMdSunnyFilledLoopToMoonFilledAltLoopTransition1.begin+5.2s"
            dur="0.4s"
            values="0;4"
          />
          <set
            fill="freeze"
            attributeName="d"
            begin="lineMdSunnyFilledLoopToMoonFilledAltLoopTransition1.begin+1.8s"
            to="M17 11h1.5M17 11h-1.5M17 11v1.5M17 11v-1.5"
          />
          <set
            fill="freeze"
            attributeName="d"
            begin="lineMdSunnyFilledLoopToMoonFilledAltLoopTransition1.begin+3.8s"
            to="M18 12h1.5M18 12h-1.5M18 12v1.5M18 12v-1.5"
          />
          <set
            fill="freeze"
            attributeName="d"
            begin="lineMdSunnyFilledLoopToMoonFilledAltLoopTransition1.begin+5.8s"
            to="M19 11h1.5M19 11h-1.5M19 11v1.5M19 11v-1.5"
          />
        </path>
        <path d="M19 4h1.5M19 4h-1.5M19 4v1.5M19 4v-1.5">
          <animate
            id="lineMdSunnyFilledLoopToMoonFilledAltLoopTransition2"
            fill="freeze"
            attributeName="stroke-dashoffset"
            begin="2.8s;lineMdSunnyFilledLoopToMoonFilledAltLoopTransition2.begin+6s"
            dur="0.4s"
            values="4;0"
          />
          <animate
            fill="freeze"
            attributeName="stroke-dashoffset"
            begin="lineMdSunnyFilledLoopToMoonFilledAltLoopTransition2.begin+2s"
            dur="0.4s"
            values="4;0"
          />
          <animate
            fill="freeze"
            attributeName="stroke-dashoffset"
            begin="lineMdSunnyFilledLoopToMoonFilledAltLoopTransition2.begin+1.2s;lineMdSunnyFilledLoopToMoonFilledAltLoopTransition2.begin+3.2s"
            dur="0.4s"
            values="0;4"
          />
          <set
            fill="freeze"
            attributeName="d"
            begin="lineMdSunnyFilledLoopToMoonFilledAltLoopTransition2.begin+1.8s"
            to="M20 5h1.5M20 5h-1.5M20 5v1.5M20 5v-1.5"
          />
          <set
            fill="freeze"
            attributeName="d"
            begin="lineMdSunnyFilledLoopToMoonFilledAltLoopTransition2.begin+5.8s"
            to="M19 4h1.5M19 4h-1.5M19 4v1.5M19 4v-1.5"
          />
        </path>
      </g>
      <g
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      >
        <g>
          <path
            strokeDasharray="2"
            strokeDashoffset="4"
            d="M12 21v1M21 12h1M12 3v-1M3 12h-1"
          >
            <animate
              fill="freeze"
              attributeName="stroke-dashoffset"
              dur="0.2s"
              values="4;2"
            />
          </path>
          <path
            strokeDasharray="2"
            strokeDashoffset="4"
            d="M18.5 18.5l0.5 0.5M18.5 5.5l0.5 -0.5M5.5 5.5l-0.5 -0.5M5.5 18.5l-0.5 0.5"
          >
            <animate
              fill="freeze"
              attributeName="stroke-dashoffset"
              begin="0.2s"
              dur="0.2s"
              values="4;2"
            />
          </path>
          <set fill="freeze" attributeName="opacity" begin="0.5s" to="0" />
        </g>
        <path
          fill="currentColor"
          d="M7 6 C7 12.08 11.92 17 18 17 C18.53 17 19.05 16.96 19.56 16.89 C17.95 19.36 15.17 21 12 21 C7.03 21 3 16.97 3 12 C3 8.83 4.64 6.05 7.11 4.44 C7.04 4.95 7 5.47 7 6 Z"
          opacity="0"
        >
          <set fill="freeze" attributeName="opacity" begin="0.5s" to="1" />
        </path>
      </g>
      <mask id="lineMdSunnyFilledLoopToMoonFilledAltLoopTransition3">
        <circle cx="12" cy="12" r="12" fill="#fff" />
        <circle cx="22" cy="2" r="3" fill="#fff">
          <animate
            fill="freeze"
            attributeName="cx"
            begin="0.1s"
            dur="0.4s"
            values="22;18"
          />
          <animate
            fill="freeze"
            attributeName="cy"
            begin="0.1s"
            dur="0.4s"
            values="2;6"
          />
          <animate
            fill="freeze"
            attributeName="r"
            begin="0.1s"
            dur="0.4s"
            values="3;12"
          />
        </circle>
        <circle cx="22" cy="2" r="1">
          <animate
            fill="freeze"
            attributeName="cx"
            begin="0.1s"
            dur="0.4s"
            values="22;18"
          />
          <animate
            fill="freeze"
            attributeName="cy"
            begin="0.1s"
            dur="0.4s"
            values="2;6"
          />
          <animate
            fill="freeze"
            attributeName="r"
            begin="0.1s"
            dur="0.4s"
            values="1;10"
          />
        </circle>
      </mask>
      <circle
        cx="12"
        cy="12"
        r="6"
        mask="url(#lineMdSunnyFilledLoopToMoonFilledAltLoopTransition3)"
        fill="currentColor"
      >
        <animate
          fill="freeze"
          attributeName="r"
          begin="0.1s"
          dur="0.4s"
          values="6;10"
        />
        <set fill="freeze" attributeName="opacity" begin="0.5s" to="0" />
      </circle>
    </svg>
  );
};

const MedicalHistoryIcon = (props: IconSvgProps) => {
  return (
    <svg
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      {...props}
    >
      <g fill="none">
        <path
          fill="currentColor"
          d="m15.393 4.054l-.502.557zm3.959 3.563l-.502.557zm2.302 2.537l-.685.305zM3.172 20.828l.53-.53zm17.656 0l-.53-.53zM14 21.25h-4v1.5h4zM2.75 14v-4h-1.5v4zm18.5-.437V14h1.5v-.437zM14.891 4.61l3.959 3.563l1.003-1.115l-3.958-3.563zm7.859 8.952c0-1.689.015-2.758-.41-3.714l-1.371.61c.266.598.281 1.283.281 3.104zm-3.9-5.389c1.353 1.218 1.853 1.688 2.119 2.285l1.37-.61c-.426-.957-1.23-1.66-2.486-2.79zM10.03 2.75c1.582 0 2.179.012 2.71.216l.538-1.4c-.852-.328-1.78-.316-3.248-.316zm5.865.746c-1.086-.977-1.765-1.604-2.617-1.93l-.537 1.4c.532.204.98.592 2.15 1.645zM10 21.25c-1.907 0-3.261-.002-4.29-.14c-1.005-.135-1.585-.389-2.008-.812l-1.06 1.06c.748.75 1.697 1.081 2.869 1.239c1.15.155 2.625.153 4.489.153zM1.25 14c0 1.864-.002 3.338.153 4.489c.158 1.172.49 2.121 1.238 2.87l1.06-1.06c-.422-.424-.676-1.004-.811-2.01c-.138-1.027-.14-2.382-.14-4.289zM14 22.75c1.864 0 3.338.002 4.489-.153c1.172-.158 2.121-.49 2.87-1.238l-1.06-1.06c-.424.422-1.004.676-2.01.811c-1.027.138-2.382.14-4.289.14zM21.25 14c0 1.907-.002 3.262-.14 4.29c-.135 1.005-.389 1.585-.812 2.008l1.06 1.06c.75-.748 1.081-1.697 1.239-2.869c.155-1.15.153-2.625.153-4.489zm-18.5-4c0-1.907.002-3.261.14-4.29c.135-1.005.389-1.585.812-2.008l-1.06-1.06c-.75.748-1.081 1.697-1.239 2.869C1.248 6.661 1.25 8.136 1.25 10zm7.28-8.75c-1.875 0-3.356-.002-4.511.153c-1.177.158-2.129.49-2.878 1.238l1.06 1.06c.424-.422 1.005-.676 2.017-.811c1.033-.138 2.395-.14 4.312-.14z"
        />
        <path
          stroke="currentColor"
          strokeWidth="1.5"
          d="M13 2.5V5c0 2.357 0 3.536.732 4.268S15.643 10 18 10h4"
        />
        <ellipse cx="17" cy="14.5" fill="currentColor" rx="1" ry="1.5" />
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          d="M9 17.5a5.41 5.41 0 0 0 6 0"
        />
        <ellipse cx="7" cy="14.5" fill="currentColor" rx="1" ry="1.5" />
      </g>
    </svg>
  );
};

const MedicalHistoryFillIcon = (props: IconSvgProps) => {
  return (
    <svg
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M14 22h-4c-3.771 0-5.657 0-6.828-1.172S2 17.771 2 14v-4c0-3.771 0-5.657 1.172-6.828S6.239 2 10.03 2c.606 0 1.091 0 1.5.017q-.02.12-.02.244l-.01 2.834c0 1.097 0 2.067.105 2.848c.114.847.375 1.694 1.067 2.386c.69.69 1.538.952 2.385 1.066c.781.105 1.751.105 2.848.105h4.052c.043.534.043 1.19.043 2.063V14c0 3.771 0 5.657-1.172 6.828S17.771 22 14 22"
        clipRule="evenodd"
        opacity="0.5"
      />
      <path
        fill="currentColor"
        d="M8 14.5c0 .828-.448 1.5-1 1.5s-1-.672-1-1.5s.448-1.5 1-1.5s1 .672 1 1.5m1.416 2.376a.75.75 0 0 0-.832 1.248a6.16 6.16 0 0 0 6.832 0a.75.75 0 1 0-.832-1.248a4.66 4.66 0 0 1-5.168 0M18 14.5c0 .828-.448 1.5-1 1.5s-1-.672-1-1.5s.448-1.5 1-1.5s1 .672 1 1.5M11.51 2.26l-.01 2.835c0 1.097 0 2.066.105 2.848c.114.847.375 1.694 1.067 2.385c.69.691 1.538.953 2.385 1.067c.781.105 1.751.105 2.848.105h4.052q.02.232.028.5H22c0-.268 0-.402-.01-.56a5.3 5.3 0 0 0-.958-2.641c-.094-.128-.158-.204-.285-.357C19.954 7.494 18.91 6.312 18 5.5c-.81-.724-1.921-1.515-2.89-2.161c-.832-.556-1.248-.834-1.819-1.04a6 6 0 0 0-.506-.154c-.384-.095-.758-.128-1.285-.14z"
      />
    </svg>
  );
};

export {
  AdditionalIcon,
  AdditionalFillIcon,
  AIIcon,
  AIFillIcon,
  HomeIcon,
  HomeFillIcon,
  HealthCentersIcon,
  HealthCentersFillIcon,
  HealthIcon,
  HealthFillIcon,
  ExerciseIcon,
  ExerciseFillIcon,
  NutritionIcon,
  NutritionFillIcon,
  WellbeingIcon,
  WellbeingFillIcon,
  SexualityIcon,
  SexualityFillIcon,
  ForAllAgesIcon,
  ForAllAgesFillIcon,
  SunLoopIcon,
  MoonLoopIcon,
  MedicalHistoryIcon,
  MedicalHistoryFillIcon,
};
