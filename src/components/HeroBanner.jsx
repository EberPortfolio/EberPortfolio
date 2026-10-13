import React from 'react';
import { cloudinaryUrl } from '../lib/cloudinary';

// Full-bleed collage under the hero. Desktop and mobile are separate artworks
// with different proportions, so each is shown whole (never cropped).
const DESKTOP = { publicId: 'banner_desktop', width: 3360, height: 1200, widths: [1280, 1920, 2560, 3360] };
const MOBILE = { publicId: 'banner_mobile', width: 1200, height: 640, widths: [600, 900, 1200] };
const MOBILE_QUERY = '(max-width: 767px)';

const srcSet = ({ publicId, widths }) =>
  widths.map((w) => `${cloudinaryUrl(publicId, { width: w })} ${w}w`).join(', ');

export const HeroBanner = () => (
  <div className="reveal-clip w-full bg-zinc-200 dark:bg-zinc-900">
    <picture>
      <source media={MOBILE_QUERY} srcSet={srcSet(MOBILE)} sizes="100vw" width={MOBILE.width} height={MOBILE.height} />
      <img
        src={cloudinaryUrl(DESKTOP.publicId, { width: 2560 })}
        srcSet={srcSet(DESKTOP)}
        sizes="100vw"
        width={DESKTOP.width}
        height={DESKTOP.height}
        alt="Collage de trabajos de Eber: 47 Street, Owoko, Violetta, Topa, Tipomov, Zpëzia, Art Attack y OLGA"
        decoding="async"
        className="block w-full h-auto"
      />
    </picture>
  </div>
);
