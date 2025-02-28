import cloudinary from "../config/cloudinary.js";

export const distroy = (imageId)=>{
  cloudinary
  .delete_resources(['samples/cld-sample-video', 'samples/dance-2', 'samples/elephants', 'samples/sea-turtle'], 
    { type: 'upload', resource_type: 'video' })
  .then(console.log);
}
