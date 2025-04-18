"use client";

import "react-lite-youtube-embed/dist/LiteYouTubeEmbed.css";
import CardList from "./card-list";
import SectionTitle from "./section-title";

const HealthWellness = () => {
  return (
    <section className="col-[1/2] lg:col-[1/3]">
      <SectionTitle
        title="Artículos Interesantes"
        hash="articulos-interesantes"
      />
      <CardList type="article" resource="salud-y-bienestar" />
    </section>
  );
};

export default HealthWellness;
