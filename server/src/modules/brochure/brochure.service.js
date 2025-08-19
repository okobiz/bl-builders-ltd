const { NotFoundError } = require("../../utils/errors.js");
const BaseService = require("../base/base.service.js");
const brochureRepository = require("./brochure.repository.js");
const {
  removeUploadFile,
} = require("../../middleware/upload/removeUploadFile.js");
const ImgUploader = require("../../middleware/upload/ImgUploder.js");

class BrochureService extends BaseService {
  #repository;
  constructor(repository, serviceName) {
    super(repository, serviceName);
    this.#repository = repository;
  }

  async createBrochure(payload, payloadFiles) {
    const { files } = payloadFiles;
    // const { title, description, detail, pdf, quote, honorName, honorDesignation, video

    // } = payload;
    // if (!title ||!details) throw new Error("title and details are required");
    if (!files) throw new Error("image is required");

    const images = await ImgUploader(files);
    for (const key in images) {
      payload[key] = images[key];
    }

    const brochureData = await this.#repository.createBrochure(payload);
    return brochureData;
  }

  async getAllBrochure() {
    return await this.#repository.findAll();
  }

  async getBrochureWithPagination(payload) {
    const brochure = await this.#repository.getBrochureWithPagination(payload);
    return brochure;
  }

  async getSingleBrochure(id) {
    const brochureData = await this.#repository.findById(id);
    if (!brochureData) throw new NotFoundError("Brochure Not Find");
    return brochureData;
  }

  async updateBrochure(id, payloadFiles, payload) {
    const { files } = payloadFiles;
    const brochureData = await this.#repository.findById(id);
    if (!brochureData) throw new NotFoundError("Brochure Not Found");

    const filesToDelete = [];

    if (files?.length) {
      const images = await ImgUploader(files);

      for (const key in images) {
        // If a new file is uploaded for this field, mark the old one for deletion
        if (brochureData[key]) {
          filesToDelete.push(brochureData[key]);
        }
        payload[key] = images[key]; // Update payload with new files
      }
    }

    const updatedBrochure = await this.#repository.updateById(id, payload);

    // Remove only the replaced files from storage
    for (const filePath of filesToDelete) {
      await removeUploadFile(filePath);
    }

    return updatedBrochure;
  }

  async deleteBrochure(id) {
    const brochure = await this.#repository.findById(id);
    if (!brochure) throw new NotFoundError("Brochure not found");
    const deletedBrochure = await this.#repository.deleteById(id);
    // Collect all images/files that need to be deleted
    const filesToDelete = [];
    if (deletedBrochure.image1) filesToDelete.push(deletedBrochure.image1);
    if (deletedBrochure.image2) filesToDelete.push(deletedBrochure.image2);
    if (deletedBrochure.pdf) filesToDelete.push(deletedBrochure.pdf);

    if (deletedBrochure) {
      // Remove all associated files from storage
      for (const filePath of filesToDelete) {
        await removeUploadFile(filePath);
      }
    }
    return deletedBrochure;
  }
}

module.exports = new BrochureService(brochureRepository, "brochure");
