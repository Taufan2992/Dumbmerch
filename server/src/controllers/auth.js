// import model
const { user } = require("../../models");

// import joi 
const Joi = require("joi");
// import bcrypt
const bcrypt = require("bcrypt");

// import jsonwebtoken
const jwt = require('jsonwebtoken')


// buat fungsi register beckend =======================================================================================
exports.register = async (req, res) => {
  // buat validasi menggunakan joi
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
    email: Joi.string().email().min(6).required(),
    password: Joi.string().min(4).required(),
  });

  // buat fungsi untuk error saat validasi
  const { error } = schema.validate(req.body);

  if (error)
    return res.status(400).send({
      error: {
        message: error.details[0].message,
      },
    });

  // buat fungsi untuk cek doble email
  const dataEmail = await user.findOne({
      where: {
          email: req.body.email,
      }
  });

  if(dataEmail){
      return res.send({
          error: {
              message: `email already exist`
          }
      });
  }

  try {

    // buat bycrypt password dengan round 10
    const salt = await bcrypt.genSalt(10);
    // buat hash bycript untuk password
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    // buat data newUesr
    const newUser = await user.create({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
      status: "customer"
    });

    // buat token menggunakan jwt (jsonwebtoken)
    const token = jwt.sign({id: newUser.id}, process.env.SECRET_KEY)

    res.status(200).send({
      status: "success...",
      data: {
        user: {
          name: newUser.name,
          email: newUser.email,
          status: newUser.status,
          token
        }
        
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failed",
      message: "Server Error",
    });
  }
};
// akhir fungsi register beckend =======================================================================================

// buat fungsi login beckend ===========================================================================================
exports.login = async (req, res) => {
 // buat validasi menggunakan joi
  const schema = Joi.object({
    email: Joi.string().email().min(6).required(),
    password: Joi.string().min(4).required(),
  });

  // buat validasi untuk error
  const { error } = schema.validate(req.body);

  if (error)
    return res.status(400).send({
      error: {
        message: error.details[0].message,
      },
    });

  try {
    // untuk mencari email terdaftar dan menampilkan data
    const userExist = await user.findOne({
      where: {
        email: req.body.email,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });
    // apabila data email belum ada di database
    if(!userExist){
      return res.status(400).send({
          error: {
              message: `Email belum terdaftar`
          }
      });
  };
    // buat perbandingan antara password dan bycript
    const isValid = await bcrypt.compare(req.body.password, userExist.password);

    // apabila password tidak valid
    if (!isValid) {
      return res.status(400).send({
        status: "failed",
        message: "password is invalid",
      });
    }
    // const SECRET_KEY = 'bebas apa saja'
    const token = jwt.sign({id: userExist.id}, process.env.SECRET_KEY)

    res.status(200).send({
      status: "success...",
      data: {
        user: {
          id: userExist.id,
        name: userExist.name,
        email: userExist.email,
        status: userExist.status,
        token
        }
        
      },
    });


  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failed",
      message: "Server Error",
    });
  }
};
// akhir fungsi login beckend =========================================================================================

// cek auth==========================================================================================================
exports.checkAuth = async (req, res) => {
  try {
    const id = req.user.id;

    const dataUser = await user.findOne({
      where: {
        id,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt", "password"],
      },
    });

    if (!dataUser) {
      return res.status(400).send({
        status: "failed",
      });
    }

    res.send({
      status: "Success",
      data: {
        user: {
          id: dataUser.id,
          name: dataUser.name,
          email: dataUser.email,
          status: dataUser.status,
          // token
        },
      },
    });
  } catch (error) {
    console.log(error);
    res.status({
      status: "failed",
      message: "Server Error",
    });
  }
};