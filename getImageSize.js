import http from "http";
import sizeOf from "image-size";

export const getImageSize = async ({ url }) => {
  return new Promise((resolve) => {
    http.get(url, (response) => {
      const chunks = [];
      response
        .on("data", (chunk) => {
          chunks.push(chunk);
        })
        .on("end", () => {
          const buffer = Buffer.concat(chunks);
          const imgSize = sizeOf(buffer);
          console.log(imgSize);
          resolve(imgSize);
        });
    });
  });
};
