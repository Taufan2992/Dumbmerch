const {user, product, transaction} = require('../../models')

exports.addUsers = async(req,res) => {

    try {
        const data = req.body
        await user.create(req.body)

        res.status(201).send({
            status: 'success',
            data: {
                user: data
            }
        })
        
    } catch (error) {
        console.log(error);
        res.status(401).send({
            status: 'failed',
            message: 'Server Error'
        })
    }
}

exports.getUsers = async(req,res) => {

    try {
        const data = await user.findAll({
            include: [
                {
                    model: product,
                    as: "products",
                    attributes: {
                        exclude: ["createAt", "updateAt"],
                    },
                },

                {
                    model: transaction,
                    as: "buyerTransaction",
                    message: 'ok'
                },

                {
                    model: transaction,
                    as: "sellerTransaction",
                    message: 'ok'
                },

            ] 
        })

        res.status(201).send({
            status: 'success',
            data: data
        })
        
    } catch (error) {
        console.log(error);
        res.status(401).send({
            status: 'failed',
            message: 'Server Error'
        })
    }
}

exports.getUser = async(req,res) => {

    try {
        const {id} = req.params

        const data = await user.findOne({
            where : {id}
        })

        res.status(201).send({
            status: 'success',
            data: data
        })
        
    } catch (error) {
        console.log(error);
        res.status(401).send({
            status: 'failed',
            message: 'Server Error'
        })
    }
}

exports.updateUser = async(req,res) => {
    
    try {
        const {id} = req.params
        const data = {
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            gender: req.body.gender,
            address: req.body.address,
            image: req.file.filename,
          };

    await user.update(data, {
      where: {
        id,
      },
    });

        res.status(201).send({
            status: 'success',
            message: `update user id: ${id} success`,
            data: {
                id,
                data,
                image: req?.file?.filename,
              },
        })
        
    } catch (error) {
        console.log(error);
        res.status(401).send({
            status: 'failed',
            message: 'Server Error'
        })
    }
}

exports.deleteUser = async(req,res) => {

    try {
        const {id} = req.params

        // untuk menampilkan info data yg id nya tidak ada di database

        // const data = await user.findOne({
        //     where : {
        //         id
        //     }
        // })

        // if (!data) {
        //     return res.send ({
        //         message: `user data ID ${id} not found`
        //     })
        // }


        await user.destroy({
            where : {id}
        })

        res.status(201).send({
            status: 'success',
            message: `delete user id: ${id} success`
        })
        
    } catch (error) {
        console.log(error);
        res.status(401).send({
            status: 'failed',
            message: 'Server Error'
        })
    }
}