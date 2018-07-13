const express = require("express");

const Phone = require("../models/phone-model.js");

const router = express.Router();


router.get("/phones", (req, res, next) => {
  Phone
    .find()
    .sort({ createdAt: -1 })  // newest first
    .then((phoneResults) => {
      res.json(phoneResults);
    })
    .catch((err) => {
      next(err);
    });
});

router.post("/phones", (req, res, next) => {
  const { brand, name, image, specs } = req.body;

  Phone.create({ brand, name, image, specs })
    .then((phoneDoc) => {
      res.json(phoneDoc);
    })
    .catch((err) => {
      next(err);
    });
});

router.get("/phone/:id", (req, res, next) => {
  const { id } = req.params;

  Phone.findById(id)
    .then((phoneDoc) => {
      if (!phoneDoc) {
        // show 404 if no phone was found
        next();
        return;
      }

      res.json(phoneDoc);
    })
    .catch((err) => {
      next(err);
    });
});

router.put("/phone/:id", (req, res, next) => {
  const { id } = req.params;
  const { brand, name, image, specs } = req.body;

  Phone.findByIdAndUpdate(
    id,
    { $set: { brand, name, image, specs } },
    // "new" gets us the updated version of the document
    { runValidators: true, new: true }
  )
  .then((phoneDoc) => {
    res.json(phoneDoc);
  })
  .catch((err) => {
    next(err);
  });
});

router.delete("/phone/:id", (req, res, next) => {
  const { id } = req.params;

  Phone.findByIdAndRemove(id)
    .then((phoneDoc) => {
      res.json(phoneDoc);
    })
    .catch((err) => {
      next(err);
    });
});


module.exports = router;
