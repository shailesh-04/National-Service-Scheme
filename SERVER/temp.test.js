import imageService from "#services/image.service.js";
imageService
    .removeImage("1743335338648_image_0.jpg")
    .then((result) => {
        console.log(result);
    })
    .catch((error) => {
        console.error("Error deleting image:", error);
        
    });
