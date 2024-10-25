import { EmblaOptionsType } from "embla-carousel";

import { MAINCAP_RESOURCES } from "@/consts/recom-carousel";

import CarouselItem from "./carousel-item";

const OPTIONS: EmblaOptionsType = { loop: true, duration: 30 };
const SLIDE_COUNT = 5;
const SLIDES = MAINCAP_RESOURCES.slice(0, SLIDE_COUNT);

const Carousel = () => <CarouselItem slides={SLIDES} options={OPTIONS} />;

export default Carousel;
