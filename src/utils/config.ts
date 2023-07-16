import { formatToBytes } from './Helpers';

type ImageExtensions = 'jpeg' | 'jpg' | 'png' | 'webp';
type ImageMimes = `image/${ImageExtensions}`;

export const config = {
  file: {
    // in bytes
    maxSize: formatToBytes(3, 'megabyte'), // bytes (3 MB)
    image: {
      mimes: ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'],
    },
  },
};
