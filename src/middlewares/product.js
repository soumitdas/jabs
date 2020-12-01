const { busboyParseAndUpload } = require("../utils/uploadBlob");
const AzureBlobStorage = require("../services/azureBlobStorage");
const blobUpload = new AzureBlobStorage("product-images");
const { HttpError } = require("../utils/helper");

/**
 * @description Parse incomming multipart/form data
 * @param req {object} Express req object
 * @param next {function} Express next middleware callback
 * @returns {Promise<*>}
 */
const parseProductForm = async (req, _, next) => {
  try {
    const { fields, blobs } = await busboyParseAndUpload(
      req,
      { limits: { fileSize: 5 * 1024 * 1024, files: 5 } },
      5 * 1024 * 1024,
      ["image/png", "image/jpeg"],
      { containerName: "product-images" }
    );

    // // If already image exist then delete that first and load the new image
    // const uploadedImages = blobs.map((blob) => blob.props);
    // if (uploadedImages.length > 0 && fields.images) {
    //   const images = JSON.parse(fields.images);
    //   images.forEach(async (image) => {
    //     await blobUpload.deleteBlobByName(image.blobFileName);
    //   });
    // }
    // fields.images = uploadedImages;

    const uploadedImages = blobs.map((blob) => blob.props);
    if (uploadedImages.length > 0) {
      fields.images = uploadedImages;
    } else {
      fields.images = JSON.parse(fields.images);
    }
    //TODO: If images alrady exist then push into it, else create new array (**Done**)
    // if (fields.images) {
    //   fields.images = JSON.parse(fields.images);

    //   if (fields.images instanceof Array) {
    //     fields.images = [...fields.images, ...blobs.map((blob) => blob.props)];
    //   } else {
    //     throw new HttpError(400, "field `images` should be an Array");
    //   }
    // } else {
    //   fields.images = blobs.map((blob) => blob.props);
    // }
    req.body = fields;
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = { parseProductForm };
