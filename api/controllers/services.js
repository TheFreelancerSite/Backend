const db = require('../database/index');
require("dotenv").config();
const cloudinary = require("../utils/cloudinary");

const getAllServices = async (req, res) => {
    try {
        const services = await db.service.findAll();
        res.status(200).json(services);
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
}

const createService = async (req, res) => {
    try {
        const { userId } = req.params
        const { title, category, description, deliveryTime, features1, features2, price } = req.body; const imageBuffer = req.file.buffer;
        const user = await db.User.findOne({ where: { id: userId } });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        // Ensure that you properly configure Cloudinary here
        const cloudinaryResult = await cloudinary.uploader.upload_stream(
            {
                resource_type: 'image',
            },
            async (error, result) => {
                if (error) {
                    console.error('Error uploading image to Cloudinary:', error);
                    return res.status(500).json({ error: 'Image upload failed' });
                }

                try {
                    const createdService = await db.service.create({
                        title,
                        category,
                        description,
                        deliveryTime,
                        features1,
                        features2,
                        price,
                        userId
                    });

                    res.status(201).json(createdService);
                } catch (serviceCreationError) {
                    console.error('Error creating service:', serviceCreationError);
                    res.status(500).json({ error: 'Service creation failed' });
                }
            }
        );

        // Pipe the image stream to Cloudinary upload
        const imageStream = Readable.from(imageBuffer);
        imageStream.pipe(cloudinaryResult);
    } catch (error) {
        console.error('Error processing request:', error);
        res.status(500).json({ error: 'Request processing failed' });
    }
}

const serviceController = {
    getAllServices,
    createService
}

module.exports = serviceController