const Jimp = require("jimp")
const joi = require('joi');
const Report = require("../model/report");

const locationSchema = joi.object({
 // description: joi.string().required(),
 // address: joi.string().required(),
 // pollingUnit: joi.number().required(),
 // agentParty: joi.string().required(),

 longitude: joi.number().required(),
 latitude: joi.number().required(),
 image: joi.string().allow(""),
 phoneNumber: joi.string().required(),
 lga: joi.string().required(),
 typeOfWaste: joi.string().required(),
 area: joi.string().required(),
 address: joi.string().required(),
})

class ReportController {

 static generateImgUrl (req, res, base64) {
  
  const buffer = Buffer.from(base64, "base64");
  let image;

  Jimp.read(buffer, async (err, resp) => {
   if (err) {
    console.error(err);
    return res.status(500).json({
     success: false,
     data: null,
     message: "Failed to capture image"
    })
   } else {

    const filepath = "uploads/" + Date.now() + "-report-image.jpg";

     image = process.env.NODE_ENV === 'development' ? `${req.protocol}://${req.hostname}:9000/${filepath}` : `${req.protocol}://${req.hostname}/${filepath}`

    resp.quality(60).write(filepath)

   }
  })
  return image
 }

 static async create(req, res, next) {
  const {
   longitude,
   latitude
  } = req.body;

  try {
   await locationSchema.validateAsync(req.body)

   const isExist = await Report.findOne({
    longitude,
    latitude,
    isTreated: false
   });
   if (isExist) {
     return res.status(403).json({
     success: false,
     message: "This waste has already been reported"
    })
   }
   
  const buffer = Buffer.from(req.body.image, "base64");

  Jimp.read(buffer, async (err, resp) => {
   if (err) {
    console.error(err);
    return res.status(500).json({
     success: false,
     data: null,
     message: "Failed to capture image"
    })
   } else {

    const filepath = "uploads/" + Date.now() + "-report-image.jpg";

    let image = process.env.NODE_ENV === 'development' ? `${req.protocol}://${req.hostname}:9000/${filepath}` : `${req.protocol}://${req.hostname}/${filepath}`;

    resp.quality(60).write(filepath)

    req.body.image = image
    await Report.create(req.body);
    const report = req.body;
    
    res.status(201).json({
     success: true,
     message: "Report submitted successfully",
     report
    })
 }
})

  } catch (error) {
   console.error(error);
   let status = 500,
    message = "Internal server error"
   if (error.details) {
    status = 422
    message = error.details[0].message
   }
   res.status(status).json({
    success: false,
    message
   })
  }
 }

 static async edit(req, res, next) {
  const {
   longitude,
   latitude
  } = req.body;

  try {
   await locationSchema.validateAsync(req.body)
   const isLocation = await Report.findById(req.params.id);

   if (longitude !== isLocation.longitude || latitude !== isLocation.latitude) {
    const isExist = await Report.findOne({
     longitude,
     latitude
    });
    if (isExist) {
     return res.status(409).json({
      success: false,
      message: "This waste has already been reported"
     })
    }
   }

   const report = await Report.findByIdAndUpdate(req.params.id, {
    $set: req.body
   })

   if (report) {
    res.status(200).json({
     success: true,
     message: "Report updated successfully",
     report
    })
   } else {
    res.status(404).json({
     success: false,
     message: "Report not found"
    })
   }
  } catch (error) {
   console.error(error);
   let status = 500,
    message = "Internal server error"
   if (error.details) {
    status = 422
    message = error.details[0].message
   }
   res.status(status).json({
    success: false,
    message
   })
  }
 }

 static async getAll(req, res, next) {
  try {

   let {
    page,
    pageSize,
    lga,
    status,
    search
   } = req.query;
   page = parseInt(page) || 1
   pageSize = parseInt(pageSize) || 1e10;

   const filter = {
    limit: pageSize,
    skip: Math.round((page - 1) * pageSize),
   }
   if (lga) filter.lga = lga
   if (status) filter.isTreated = status === "Treated" ? true : false
   if (search) filter.area = {
    $regex: new RegExp(`.*${search}*.`),
    $options: 'i'
   }
   // if (search) filter.address = {
   //  $regex: new RegExp(`.*${search}*.`),
   //  $options: 'i'
   // }

   const total = await Report.countDocuments(filter)
   let {
    limit,
    skip,
    ...rest
   } = filter
   let reports;
   if (search) {
    reports = await Report.find(rest).skip(skip).limit(limit).sort({
     updatedAt: -1
    }).populate("treatedBy");
    if (reports.length === 0) {
     let {
      limit,
      skip,
      ...rest
     } = filter;
     reports = await Report.find(rest).skip(skip).limit(limit).sort({
      updatedAt: -1
     }).populate("treatedBy");
    }
   } else {
    reports = await Report.find(rest).skip(skip).limit(limit)
    .populate({path: "treatedBy"});
   }

   res.status(200).json({
    success: true,
    message: "Locations retrieved successfully",
    data: {
     reports,
     page,
     pageSize,
     total
    }
   })

  } catch (err) {
   console.error(err);
   res.status(500).json({
    success: false,
    message: "Failed to retrieve reports"
   })
  }
 }

 static async deleteOne(req, res, next) {
  try {
   const deleted = await Report.findByIdAndDelete(req.params.id, {
    new: true
   })
   if (deleted) res.status(200).json({
    success: true,
    data: deleted,
    message: "Report deleted successfully"
   })
   else res.status(500).json({
    success: false,
    message: "Failed to delete report, please try again"
   });
  } catch (error) {
   res.status(500).json({
    success: false,
    message: "Failed to delete report, please try again",
    error
   });
  }
 }

 static async deleteBulk(req, res, next) {
  try {
   let count = [];
   for (let id of req.body.locationIds) {
    let data = await Report.findByIdAndDelete(id)
    if (data) count.push(data._id)
   }
   if (count.length) res.status(200).json({
    success: true,
    data: count.length,
    message: "Locations deleted successfully"
   })
   else res.status(500).json({
    success: false,
    message: "Failed to delete reports, please try again"
   });
  } catch (error) {
   console.log(error);
   res.status(500).json({
    success: false,
    message: "Failed to delete reports, please try again",
    error
   });
  }
 }

 static async treatReport(req, res, next) {
  console.log(res.locals.user);
  const  {isTreated } = req.body, {
   id
  } = req.params;

  

    Report.findByIdAndUpdate(id, {
     $set: {
      isTreated,
      treatedBy: res.locals?.user?.id
     }
    }, {
     new: true
    }).then(doc => {
     if (doc) return res.status(200).json({
      success: true,
      data: doc,
      message: "Report successfully treated"
     })
     else return res.status(500).json({
      success: false,
      data: null,
      message: "Failed to treat report"
     })
    }).catch(err => {
     console.error(err);
     return res.status(500).json({
      success: false,
      data: err,
      message: "Something went wrong"
     })
    })
 }
}

module.exports = ReportController;