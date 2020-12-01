const { BlobServiceClient } = require("@azure/storage-blob");

const blobServiceClient = BlobServiceClient.fromConnectionString(
  process.env.AZURE_STORAGE_CONNECTION_STRING
);

/**
 * @description Class representing Azure Blob Storage service
 */
class AzureBlobStorage {
  /**
   * @param containerName {string} Blob container name
   */
  constructor(containerName) {
    this.containerName = containerName;
    this.containerClient = blobServiceClient.getContainerClient(containerName);
  }

  /**
   * @description upload Stream to Azure Blob Storage
   * @param {object} fileProps blob file properties
   * @param {ReadableStream} stream Node.js readable stream
   * @param {number} bufferSize
   * @param {number} maxConcurrency
   * @param {object} options Azure Blob options
   * @returns {Promise<object>}
   */
  async uploadFileStream(
    fileProps,
    stream,
    bufferSize,
    maxConcurrency,
    options
  ) {
    const blockBlobClient = this.containerClient.getBlockBlobClient(
      fileProps.blobFileName
    );

    return new Promise((resolve, reject) => {
      blockBlobClient
        .uploadStream(stream, bufferSize, maxConcurrency, options)
        .then((resp) =>
          resolve({
            ...resp,
            props: { url: blockBlobClient.url, ...fileProps },
          })
        )
        .catch((err) => reject(err));
    });

    // const resp = await blockBlobClient.uploadStream(
    //   stream,
    //   bufferSize,
    //   maxConcurrency,
    //   options
    // );
    // return { ...resp, url: blockBlobClient.url };
  }

  async uploadFile(blobFileName, filePath, options) {
    const blockBlobClient = this.containerClient.getBlockBlobClient(
      blobFileName
    );

    const resp = await blockBlobClient.uploadFile(filePath, options);
    return { ...resp, url: blockBlobClient.url };
  }

  async uploadBuffer(blobFileName, bufferData, bufferLength, options) {
    const blockBlobClient = this.containerClient.getBlockBlobClient(
      blobFileName
    );

    const resp = await blockBlobClient.upload(
      bufferData,
      bufferLength,
      options
    );
    return { ...resp, url: blockBlobClient.url };
  }

  deleteBlobByName(blobName) {
    return this.containerClient.deleteBlob(blobName);
  }
}

module.exports = AzureBlobStorage;
