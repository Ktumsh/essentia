"use client";
import { RESOURCES } from "@/consts/resources";
import ResourceWrapper from "@/modules/core/components/wrappers/resource-wrapper";

type Props = {
  params: { resource: string };
};

const ResourcePage = ({ params }: Props) => {
  const resource = params.resource;

  const resourceData = RESOURCES.find((item) => item.resource === resource);

  if (!resourceData) return <p>Resource not found</p>;

  const {
    title,
    quote,
    videoTitle,
    videoLink,
    videoImage,
    imageFull,
    component: ContentComponent,
    background,
  } = resourceData;

  return (
    <>
      <ResourceWrapper
        title={title}
        quote={quote}
        videoTitle={videoTitle}
        videoLink={videoLink}
        videoImage={videoImage}
        imageFull={imageFull}
        background={background}
        component={ContentComponent}
      />
    </>
  );
};

export default ResourcePage;
