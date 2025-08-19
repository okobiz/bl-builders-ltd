const { NotFoundError } = require("../../utils/errors.js");
const BaseService = require("../base/base.service.js");
const serviceRepository = require("./service.repository.js");
const {
  removeUploadFile,
} = require("../../middleware/upload/removeUploadFile.js");
const ImgUploader = require("../../middleware/upload/ImgUploder.js");

class ServiceService extends BaseService {
  #repository;
  constructor(repository, serviceName) {
    super(repository, serviceName);
    this.#repository = repository;
  }

  async createService(payload, payloadFiles) {
    const { files } = payloadFiles;
    // const { title, details } = payload;
    // if (!title || !details) throw new Error("title and details are required");
    if (!files) throw new Error("image is required");

    const images = await ImgUploader(files);
    for (const key in images) {
      payload[key] = images[key];
    }

    const serviceData = await this.#repository.createService(payload);
    return serviceData;
  }

  async getAllService() {
    return await this.#repository.findAll();
  }

  async getServiceWithPagination(payload) {
    const service = await this.#repository.getServiceWithPagination(payload);
    return service;
  }

  async getSingleService(id) {
    const serviceData = await this.#repository.findById(id);
    if (!serviceData) throw new NotFoundError("Service Not Find");
    return serviceData;
  }

  async updateService(id, payloadFiles, payload) {
    const { files } = payloadFiles;

    if (files?.length) {
      const images = await ImgUploader(files);
      for (const key in images) {
        payload[key] = images[key];
      }
    }

    const serviceData = await this.#repository.updateById(id, payload);
    if (!serviceData) throw new NotFoundError("Service Not Find");

    if (files.length && serviceData) {
      await removeUploadFile(serviceData?.image);
    }
    return serviceData;
  }

  async deleteService(id) {
    const service = await this.#repository.findById(id);
    if (!service) throw new NotFoundError("Service not found");
    const deletedService = await this.#repository.deleteById(id);
    if (deletedService) {
      await removeUploadFile(service?.image);
    }
    return deletedService;
  }
}

module.exports = new ServiceService(serviceRepository, "service");
