const { ServiceSchema } = require("../../models/index.js");
const pagination = require("../../utils/pagination.js");
const BaseRepository = require("../base/base.repository.js");

class ServiceRepository extends BaseRepository {
  #model;
  constructor(model) {
    super(model);
    this.#model = model;
  }

  async createService(payload) {
    const newService = await this.#model.create(payload);
    return newService;
  }

  async getServiceWithPagination(payload) {
    try {
      const services = await pagination(
        payload,
        async (limit, offset, sortOrder) => {
          const services = await this.#model
            .find({})
            .sort({ createdAt: sortOrder })
            .skip(offset)
            .limit(limit);
          // .populate('')
          // .populate('')
          const totalService = await this.#model.countDocuments();

          return { doc: services, totalDoc: totalService };
        }
      );

      return services;
    } catch (error) {
      console.error("Error getting services with pagination:", error);
      throw error;
    }
  }
}

module.exports = new ServiceRepository(ServiceSchema);
