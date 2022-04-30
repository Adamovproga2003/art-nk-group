const express = require("express");
const router = express.Router();
var request = require("request");
const PhoneModel = require("../models/PhoneReg");
var authy = require("authy")("sCkOmkTLmNA2hsV1oafsza37FIAGu8os");

router.post("/validate-address", (req, res, next) => {
  const {
    address_line1,
    city_locality,
    state_province,
    postal_code,
    country_code,
  } = req.body;

  console.log(req);
  var options = {
    method: "POST",
    url: "https://api.shipengine.com/v1/addresses/validate",
    headers: {
      Host: "api.shipengine.com",
      "API-Key": "TEST_0/40xmEgh4K5LhAze219I2AW1nI6hIQnuR8RGSmHxDg",
      "Content-Type": "application/json",
    },
    body: JSON.stringify([
      {
        address_line1,
        city_locality,
        state_province,
        postal_code,
        country_code,
      },
    ]),
  };
  request(options, (error, response) => {
    if (error)
      res.status(400).json({
        errors: [{ message: error }],
      });

    const parsedResponse = JSON.parse(response.body);

    if (parsedResponse.errors && parsedResponse.errors.length > 0) {
      return res.status(400).json({
        errors: [{ message: parsedResponse.errors[0].message }],
      });
    }

    console.log(parsedResponse)

    const {
      address_line1,
      city_locality,
      state_province,
      postal_code,
      country_code,
    } = parsedResponse[0].matched_address;

    return res.status(200).json({
      data: {
        isValid: parsedResponse[0].status === "verified" ? true : false,
        address: address_line1,
        city: city_locality,
        state: state_province,
        postal_code,
        country_code,
      },
    });
  });
});

router.post("/virefy-number", (req, res, next) => {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const client = require("twilio")(accountSid, authToken);

  const { dialCode, rawPhone } = req.body;

  PhoneModel.findOne(
    { phone: `+${dialCode}${rawPhone}` },
    function (err, phoneReg) {
      if (err) {
        return res.status(400).json({
          errors: [{ message: err }],
          isConfirmed: false,
        });
      }
      if (phoneReg) {
        return res.status(302).json({
          message: `This number has been already created in ${phoneReg.date_of_confirmation}`,
          isConfirmed: true,
        });
      } else {
        authy
          .phones()
          .verification_start(
            rawPhone,
            dialCode,
            "sms",
            function (err, response) {
              if (err) {
                return res.status(400).json({
                  errors: [{ message: err }],
                  isConfirmed: false,
                })
              }

              return res
                .status(200)
                .cookie("dialCode", dialCode, {
                  sameSite: "strict",
                  path: "/",
                  expires: new Date(new Date().getTime() + 5 * 20000),
                  httpOnly: true,
                })
                .cookie("rawPhone", rawPhone, {
                  sameSite: "strict",
                  path: "/",
                  expires: new Date(new Date().getTime() + 5 * 20000),
                  httpOnly: true,
                })
                .json({
                  message: response.message,
                });
            }
          );
      }
    }
  );

  // client.verify
  //   .services("VA5d48825086e0bd772a9d62c4bd4f2028")
  //   .verificationChecks.create({ to: "+15017122661", code: "123456" })
  //   .then((verification_check) => console.log(verification_check.status))
  //   .catch((e) => console.log(e));

  // client.verify
  //   .services("VAXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
  //   .verificationChecks.create({ to: req.body.phoneNumber, code: "1234" })
  //   .then((verification_check) => console.log(verification_check.status));
});

router.post("/verify-code", (req, res, next) => {
  const { dialCode, rawPhone } = req.cookies;

  authy
    .phones()
    .verification_check(
      rawPhone,
      dialCode,
      req.body.code,
      function (err, response) {
        if (err) {
          // invalid token
          console.error(err);
          res.status(400).json({
            errors: [{ message: err }],
            isConfirmed: false,
          });
        }

        if (response.success) {
          console.log(response.message);
          PhoneModel.findOne(
            { phone: `+${dialCode}${rawPhone}` },
            function (err, phoneReg) {
              if (err) {
                return res.status(400).json({
                  errors: [{ message: err }],
                  isConfirmed: false,
                });
              }
              if (phoneReg) {
                return res.status(302).json({
                  message: `This number has been already created in ${phoneReg.date_of_confirmation}`,
                  isConfirmed: true,
                });
              } else {
                const phone = PhoneModel.create({
                  phone: `+${dialCode}${rawPhone}`,
                  date_of_confirmation: new Date(),
                });
                return res.status(201).json({
                  message: `Phone ${`+${dialCode}${rawPhone}`} was succesfully confirmed`,
                  isConfirmed: true,
                });
              }
            }
          );
        }
      }
    );
});

module.exports = router;
