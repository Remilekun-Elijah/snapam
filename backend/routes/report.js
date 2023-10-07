const Api = require("express").Router();
const ReportController = require('../controllers/report')
const jwt = require('jsonwebtoken')

const secret = "mY_Wicked_SecereT_123"
const verifyToken = (token) => {
 const token_slice = token.replace(/Bearer/g, "").trim();
 const decode = jwt.decode(token_slice);
 var seconds = 1000;
 var d = new Date();
 var t = d.getTime();
 if (decode === "invalid signature") return "invalid_signature";
 else if (decode == (undefined || null)) return "token_expired";
 else if (decode.exp < Math.round(t / seconds)) {
     return "token_expired";
 } else {
     const isVerified = jwt.verify(token_slice, secret);
     return isVerified;
 }
},
ApiResponse = {
 gen: (code, message, data) => {
  return {code, message, data};
}
};

Api.route("/")
 .post(ReportController.create)
 .get(ReportController.getAll)
 .patch(ReportController.deleteBulk);

 Api.route("/:id")
 .delete(ReportController.deleteOne)
 .put(ReportController.edit);

Api.put("/treat/:id", (req, res, next) => {
 try {
  const token = req.headers.authorization;
  if (token?.trim()) {
     const isVerified = verifyToken(token);
     if (isVerified === "token_expired" || isVerified === "invalid signature") {
        const data = ApiResponse.gen(401, "You are not authorized");
        return res.status(data.code).json(data);
     } else {
        res.locals.user = isVerified;
        next();
     }
  } else {
     const data = ApiResponse.gen(401, "No token provided");
     return res.status(data.code).json(data);
  }
} catch (err) {
 console.log(err);
  const data = ApiResponse.gen(401, "Bad Token");
  return res.status(data.code).json(data);
}
}, ReportController.treatReport)

module.exports = Api