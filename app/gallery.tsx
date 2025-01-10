"use client";

import { Asset } from "@/types";
import { useState } from "react";
import { RowsPhotoAlbum } from "react-photo-album";
import "react-photo-album/rows.css";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

const Gallery = ({ images }: { images?: Asset[] }) => {
  const [index, setIndex] = useState(-1);

  if (!images || !images?.length) return null;

  const slides = images
    .filter(Boolean)
    .map(({ title, url, width, height }) => ({
      src: url,
      title,
      width,
      height,
    }));

  return (
    <>
      <RowsPhotoAlbum
        photos={slides}
        targetRowHeight={150}
        onClick={({ index: current }) => setIndex(current)}
      />

      <Lightbox
        index={index}
        slides={slides}
        open={index >= 0}
        close={() => setIndex(-1)}
      />
    </>
  );
};

export default Gallery;
