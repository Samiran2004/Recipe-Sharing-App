const cloudinary = require('../middleware/cloudinaryModdleware');

async function deleteImage(public_id) {
    try {
        await cloudinary.uploader.destroy(public_id);
    } catch (error) {
        res.status(400).send({
            status: "Failed",
            message: "Image can't be deleted"
        });
    }
}

module.exports = deleteImage