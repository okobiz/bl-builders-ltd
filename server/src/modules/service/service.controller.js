const catchError = require("../../middleware/errors/catchError.js");
const responseHandler = require("../../utils/responseHandler.js");
const withTransaction = require("../../middleware/transactions/withTransaction.js");
const ServiceService = require("./service.service.js");

class ServiceController {
  createService = withTransaction(async (req, res, next, session) => {
    const payloadFiles = {
      files: req.files,
    };
    const payload = {
      title: req?.body?.title,
      details: req?.body?.details,
      // isActive: req?.body?.isActive,
    };
    const serviceResult = await ServiceService.createService(
      payload,
      payloadFiles,
      session
    );
    const resDoc = responseHandler(
      201,
      "Service Created successfully",
      serviceResult
    );
    res.status(resDoc.statusCode).json(resDoc);
  });

  getAllService = catchError(async (req, res) => {
    const serviceResult = await ServiceService.getAllService();
    const resDoc = responseHandler(200, "Get All Services", serviceResult);
    res.status(resDoc.statusCode).json(resDoc);
  });

  getServiceWithPagination = catchError(async (req, res) => {
    let payload = {
      page: req.query.page,
      limit: req.query.limit,
      order: req.query.order,
    };
    const service = await ServiceService.getServiceWithPagination(payload);
    const resDoc = responseHandler(200, "Services get successfully", service);
    res.status(resDoc.statusCode).json(resDoc);
  });

  getSingleService = catchError(async (req, res) => {
    const id = req.params.id;
    const serviceResult = await ServiceService.getSingleService(id);
    const resDoc = responseHandler(
      201,
      "Single Service successfully",
      serviceResult
    );
    res.status(resDoc.statusCode).json(resDoc);
  });

  updateService = catchError(async (req, res) => {
    const id = req.params.id;
    const payloadFiles = {
      files: req?.files,
    };
    const payload = {
      title: req?.body?.title,
      details: req?.body?.details,
      isActive: req?.body?.isActive,
    };
    const serviceResult = await ServiceService.updateService(
      id,
      payloadFiles,
      payload
    );
    const resDoc = responseHandler(
      201,
      "Service Update successfully",
      serviceResult
    );
    res.status(resDoc.statusCode).json(resDoc);
  });

  updateServiceStatus = catchError(async (req, res) => {
    const id = req.params.id;
    const status = req.query.status;
    const serviceResult = await ServiceService.updateServiceStatus(id, status);
    const resDoc = responseHandler(
      201,
      "Service Status Update successfully",
      serviceResult
    );
    res.status(resDoc.statusCode).json(resDoc);
  });

  deleteService = catchError(async (req, res) => {
    const id = req.params.id;

    const serviceResult = await ServiceService.deleteService(id);
    const resDoc = responseHandler(
      200,
      "Service Deleted successfully",
      serviceResult
    );
    res.status(resDoc.statusCode).json(resDoc);
  });
}

module.exports = new ServiceController();
