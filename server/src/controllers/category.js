const { category } = require("../../models");

 // membuat fungsi get categori ======================================================================================
exports.getCategory = async (req, res) => {
    try {
        const categories = await category.findAll({
            attributes: {
                exclude: ["createdAt", "updatedAt"]
            }
        });

        res.status(200).send({
            status: "Success",
            data: {
                categories
            },
        });
    } catch (error) {
        console.log(error);
        res.status(404).send({
            status: "Get data Failed",
            message: "Server Error",
        });
    }
};
// akhir fungsi get categori ========================================================================================

// membuat fungsi add categori ======================================================================================
exports.addCategory = async (req, res) => {
    try {
        let newCategory = await category.create(req.body);

        res.status(200).send({
            status: "Success",
            data: {
                category: {
                    id: newCategory.id,
                    name: newCategory.name
                }
            },
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            status: "Add Category Failed",
            message: "Server Error",
        });
    }
};
// akhir fungsi get categori ========================================================================================

// membuat fungsi detail categori ====================================================================================
exports.getDetailCategory = async (req, res) => {
    const { id } = req.params;

    try {
        const categories = await category.findOne({
            where: { id },
            attributes: {
                exclude: ["createdAt", "updatedAt"]
            }
        });

        res.status(200).send({
            status: "Success",
            
            data: {
                 categories: {
                    id: categories.id,
                    name: categories.name
                }
            },
        });
    } catch (error) {
        console.log(error);
        res.status(404).send({
            status: "Get detail data failed",
            message: "Server Error",
        });
    }
};
// akhir fungsi setail categori ======================================================================================

// membuat fungsi update categori =====================================================================================
exports.updateCategory = async (req, res) => {
    const { id } = req.params;

    try {
        const data = req.body
        console.log(data)
        let updateCategory = await category.update({
            ...data
        },
            { where: { id } }
        );

        console.log(updateCategory)

        res.status(200).send({
            status: "Success",

            data: {
                category: {
                    id: id,
                    name: data.name
                }
            },
        });
    } catch (error) {
        console.log(error);
        res.status(404).send({
            status: "Updated product failed",
            message: "Server Error",
        });
    }
};
// akhir fungsi update categori ======================================================================================

// membuat fungsi delete categori =====================================================================================
exports.deleteCategory = async (req, res) => {
    const { id } = req.params;

    try {
        const data = await category.destroy({
            where: { id },
        });

        console.log(data)

        res.status(200).send({
            status: "Success",
            data: {
                id: { id }
            },
        });
    } catch (error) {
        console.log(error);
        res.status(401).send({
            status: "Delete category failed",
            message: "Server Error",
        });
    }
};
// akhir fungsi delete categori ======================================================================================