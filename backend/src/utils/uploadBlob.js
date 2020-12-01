const Busboy = require("busboy");
const AzureBlobStorage = require("../services/azureBlobStorage");

/**
 * @description Parse multipart/form data using busboy and stream it to Azure blob
 * @param {object} req Express request object
 * @param {object} busboyParams Busboy config params
 * @param {number} maxSize Max filesize in bytes
 * @param {Array} mimeAcceptedList acceptable mime formats
 * @param {object} azureConfig Azure blob config params
 */
const busboyParseAndUpload = (
  req,
  busboyParams,
  maxSize,
  mimeAcceptedList = [],
  azureConfig = { containerName: "" }
) =>
  new Promise((resolve, reject) => {
    const busboy = new Busboy({
      headers: req.headers,
      ...busboyParams,
    });
    const fields = {};
    const fileUploadPromise = [];

    const blobUpload = new AzureBlobStorage(azureConfig.containerName);

    try {
      busboy.on("field", (fieldname, val) => (fields[fieldname] = val));

      busboy.on("file", (fieldName, file, fileName, _, mimeType) => {
        // Check mime
        if (
          mimeAcceptedList.length > 0 &&
          !mimeAcceptedList.includes(mimeType.toLowerCase())
        ) {
          //   reject(Error("Mime type not supported"));
          //   return;
          throw Error("Mime type not supported");
        }

        // Checking Size
        const contentLength = Number(req.headers["content-length"]);
        if (maxSize && contentLength > maxSize) {
          //   reject(Error("File size too long"));
          //   return;
          throw Error("File size too long");
        }

        //Busboy limit
        file.on("limit", () => {
          throw Error(`Size limit reached`);
        });

        const blobFileName = `${Date.now()}-${fileName}`;

        const p = blobUpload.uploadFileStream(
          { blobFileName, fieldName, fileName, mimeType },
          file,
          undefined,
          undefined,
          {
            blobHTTPHeaders: { blobContentType: mimeType },
            metadata: { uploadedBy: req.auth ? req.auth.id : "" },
          }
        );
        fileUploadPromise.push(p);
      });

      busboy.once("error", (err) => {
        throw err;
      });

      busboy.once("finish", () => {
        Promise.all(fileUploadPromise).then((data) => {
          resolve({ fields, blobs: data });
        });
      });
    } catch (err) {
      req.unpipe(busboy);
      reject(err);
    }

    req.pipe(busboy);
  });

module.exports = { busboyParseAndUpload };
