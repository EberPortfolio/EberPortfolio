// Images are hosted on Cloudinary. Reference them by public ID (e.g. 'about_me')
// and let Cloudinary pick format/quality and resize per breakpoint.
const CLOUD_NAME = 'le59kgwh';
const BASE_URL = `https://res.cloudinary.com/${CLOUD_NAME}/image/upload`;
const DEFAULT_WIDTHS = [480, 800, 1200, 1600];

const isExternal = (src) => /^https?:\/\//.test(src);

export const cloudinaryUrl = (publicId, { width, crop = 'limit', gravity } = {}) => {
  if (isExternal(publicId)) return publicId;
  const transforms = ['f_auto', 'q_auto', `c_${crop}`];
  if (width) transforms.push(`w_${width}`);
  if (gravity) transforms.push(`g_${gravity}`);
  return `${BASE_URL}/${transforms.join(',')}/${publicId}`;
};

// Props for <img>: src + srcSet + sizes. External URLs pass through untouched.
export const cloudinaryImage = (publicId, { sizes = '100vw', widths = DEFAULT_WIDTHS, ...options } = {}) => {
  if (isExternal(publicId)) return { src: publicId };
  return {
    src: cloudinaryUrl(publicId, { ...options, width: widths[widths.length - 1] }),
    srcSet: widths.map((w) => `${cloudinaryUrl(publicId, { ...options, width: w })} ${w}w`).join(', '),
    sizes
  };
};
