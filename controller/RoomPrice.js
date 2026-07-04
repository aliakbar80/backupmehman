const RoomPrice = require("../models/RoomPrice.model");

// دریافت همه قیمت‌ها
const getAllPrices = async (req, res) => {
    try {
        const prices = await RoomPrice.find().exec();
        res.status(200).send({ data: prices.reverse() });
    } catch (error) {
        res.status(500).send({ msg: "خطا در دریافت اطلاعات", error });
    }
};

// دریافت یک قیمت با ID
const getPriceById = async (req, res) => {
    try {
        const { id } = req.params;
        const price = await RoomPrice.findById(id).exec();
        if (!price) {
            return res.status(404).send({ msg: "قیمت مورد نظر یافت نشد" });
        }
        res.status(200).send({ data: price });
    } catch (error) {
        res.status(500).send({ msg: "خطا در دریافت اطلاعات", error });
    }
};

// ایجاد قیمت جدید
const createPrice = async (req, res) => {
    try {
        const { roomType, price, description } = req.body;

        if (!roomType || !price) {
            return res.status(422).send({ msg: "نوع اتاق و قیمت الزامی است!" });
        }

        // بررسی تکراری نبودن نوع اتاق
        const existingRoom = await RoomPrice.findOne({ roomType: roomType.trim() });
        if (existingRoom) {
            return res.status(400).send({ msg: "این نوع اتاق قبلاً ثبت شده است!" });
        }

        const newPrice = new RoomPrice({
            roomType: roomType.trim(),
            price,
            description: description || ""
        });

        await newPrice.save();
        res.status(201).send({ msg: "قیمت با موفقیت ثبت شد", data: newPrice });
    } catch (error) {
        res.status(500).send({ msg: "خطا در ثبت اطلاعات", error });
    }
};

// بروزرسانی قیمت
const updatePrice = async (req, res) => {
    try {
        const { id } = req.params;
        const { roomType, price, description } = req.body;

        if (!roomType || !price) {
            return res.status(422).send({ msg: "نوع اتاق و قیمت الزامی است!" });
        }

        const updatedPrice = await RoomPrice.findByIdAndUpdate(
            id,
            { roomType: roomType.trim(), price, description },
            { new: true }
        );

        if (!updatedPrice) {
            return res.status(404).send({ msg: "قیمت مورد نظر یافت نشد" });
        }

        res.status(200).send({ msg: "قیمت با موفقیت بروزرسانی شد", data: updatedPrice });
    } catch (error) {
        res.status(500).send({ msg: "خطا در بروزرسانی اطلاعات", error });
    }
};

// حذف قیمت
const deletePrice = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedPrice = await RoomPrice.findByIdAndDelete(id);

        if (!deletedPrice) {
            return res.status(404).send({ msg: "قیمت مورد نظر یافت نشد" });
        }

        res.status(200).send({ msg: "قیمت با موفقیت حذف شد" });
    } catch (error) {
        res.status(500).send({ msg: "خطا در حذف اطلاعات", error });
    }
};

module.exports = {
    getAllPrices,
    getPriceById,
    createPrice,
    updatePrice,
    deletePrice
};
