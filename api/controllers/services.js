import { service } from "../database/models/service"
const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = {
    getAllServices: async (req, res) => {
        try {
            const services = await service.findAll();

            res.status(200).json(services);
        } catch (error) {
            console.log(error)
            res.status(500).send(error)
        }
    },
    createService: async (req, res) => {
        try {
            const { title, totalStars, price, job_img, feautures } = req.body;
            const imageBuffer = req.file.buffer;

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
                        const createdService = await service.create({
                            title,
                            totalStars,
                            price,
                            job_img: result.secure_url,
                            feautures,
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


}