const Guest = require("../models/Guest.medel")

function len(s) {
    return (((s / 1000) / 60) / 60) / 24
}

const getData = async (req, res) => {
    const guests = await Guest.find().exec();

    res.status(200).send({ "data": guests.reverse() });
}

const getDataSlice = async (req, res) => {

    const guests = await Guest.find().exec()

    const { page } = req.params;

    const n = page * 5;

    res.status(200).send({ "data": guests.reverse().slice(n - 5, n) });
}

const getDataSingle = async (req, res) => {
    const guests = await Guest.find().exec();

    const { id } = req.params

    res.status(200).send({ "data": guests.find(i => i._id == id) });
}

const getReports = async (req, res) => {
    const guests = await Guest.find().exec();


    let last30day = await Guest.find(
        {
            "createdAt":
            {
                $gte: new Date((new Date().getTime() - (30 * 24 * 60 * 60 * 1000)))
            }
        }
    ).sort({ "date": -1 });

    let last7day = await Guest.find(
        {
            "createdAt":
            {
                $gte: new Date((new Date().getTime() - (7 * 24 * 60 * 60 * 1000)))
            }
        }
    ).sort({ "date": -1 })

    res.status(200).send({
        data: {
            orderTotal: guests.length,
            orderMonth: last30day.length,
            priceMonth: last30day.length === 0 ? 0 : Math.round(last30day.map(i => i.price).reduce((t, n) => (t + n))),
            orderWeek: last7day.length,
            weekMonth: last7day.length === 0 ? 0 : Math.round(last7day.map(i => i.price).reduce((t, n) => (t + n))),
            meanMonth: last30day.length === 0 ? 0 : Math.round(last30day.map(i => i.price).reduce((t, n) => (t + n)) / last30day.length),
            meanWeek: last7day.length === 0 ? 0 : Math.round(last7day.map(i => i.price).reduce((t, n) => (t + n)) / last7day.length),
            totalPrice: guests.length === 0 ? 0 : Math.round(guests.map(i => i.price).reduce((t, n) => (t + n))),
            mean: guests.length === 0 ? 0 : Math.round(guests.map(i => i.price).reduce((t, n) => (t + n)) / guests.length),
            data7: last7day,
            data30: last30day,
        }
    });
}

const getReportsPost = async (req, res) => {
    const guests = await Guest.find().exec();

    if (!req.body.timeSelect || req.body.timeSelect === "") {
        return res.status(400).send({ "msg": "No time selected" });
    }


    let last30day = await Guest.find(
        {
            "createdAt":
            {
                $gte: new Date((parseInt(req.body.timeSelect) - (30 * 24 * 60 * 60 * 1000)))
            }
        }
    ).sort({ "date": -1 });

    let last7day = await Guest.find(
        {
            "createdAt":
            {
                $gte: new Date((parseInt(req.body.timeSelect) - (7 * 24 * 60 * 60 * 1000)))
            }
        }
    ).sort({ "date": -1 })

    res.status(200).send({
        data: {
            orderTotal: guests.length,
            orderMonth: last30day.length,
            priceMonth: last30day.length === 0 ? 0 : Math.round(last30day.map(i => i.price).reduce((t, n) => (t + n))),
            orderWeek: last7day.length,
            weekMonth: last7day.length === 0 ? 0 : Math.round(last7day.map(i => i.price).reduce((t, n) => (t + n))),
            meanMonth: last30day.length === 0 ? 0 : Math.round(last30day.map(i => i.price).reduce((t, n) => (t + n)) / last30day.length),
            meanWeek: last7day.length === 0 ? 0 : Math.round(last7day.map(i => i.price).reduce((t, n) => (t + n)) / last7day.length),
            totalPrice: guests.length === 0 ? 0 : Math.round(guests.map(i => i.price).reduce((t, n) => (t + n))),
            mean: guests.length === 0 ? 0 : Math.round(guests.map(i => i.price).reduce((t, n) => (t + n)) / guests.length),
            data7: last7day,
            data30: last30day,
        }
    });
}

const postReports = async (req, res) => {
    const guests = await Guest.find().exec();

    if (!req.body.timeStart || req.body.timeStart === "") {
        return res.status(400).send({ msg: "timeStart مشخص نیست!" })
    }

    let last30day = await Guest.find(
        {
            "createdAt":
            {
                $gte: new Date((parseInt(req.body.timeStart) - (30 * 24 * 60 * 60 * 1000)))
            }
        }
    ).sort({ "date": -1 });

    let last7day = await Guest.find(
        {
            "createdAt":
            {
                $gte: new Date((parseInt(req.body.timeStart) - (7 * 24 * 60 * 60 * 1000)))
            }
        }
    ).sort({ "date": -1 })

    res.status(200).send({
        data: {
            orderTotal: guests.length,
            orderMonth: last30day.length,
            priceMonth: last30day.length === 0 ? 0 : Math.round(last30day.map(i => i.price).reduce((t, n) => (t + n))),
            orderWeek: last7day.length,
            weekMonth: last7day.length === 0 ? 0 : Math.round(last7day.map(i => i.price).reduce((t, n) => (t + n))),
            meanMonth: last30day.length === 0 ? 0 : Math.round(last30day.map(i => i.price).reduce((t, n) => (t + n)) / last30day.length),
            meanWeek: last7day.length === 0 ? 0 : Math.round(last7day.map(i => i.price).reduce((t, n) => (t + n)) / last7day.length),
            totalPrice: guests.length === 0 ? 0 : Math.round(guests.map(i => i.price).reduce((t, n) => (t + n))),
            mean: guests.length === 0 ? 0 : Math.round(guests.map(i => i.price).reduce((t, n) => (t + n)) / guests.length),
            data7: last7day,
            data30: last30day,
        }
    });
}

const postData = async (req, res) => {
    try {
        const {
            fullname,
            isSpecial,
            number_room,
            city,
            phone,
            login_date,
            logout_date,
            price_room,
            stay_time,
            discount,
            price,
            description,
        } = req.body;

        if (!fullname ||
            !number_room ||
            !city ||
            !phone ||
            !description ||
            !login_date ||
            !logout_date ||
            !price_room ||
            !stay_time ||
            !price
        ) {
            return res.status(422).send({ "msg": "خطا درارسال اطلاعات !" })
        }

        const newData = new Guest({
            fullname,
            isSpecial,
            number_room,
            city,
            phone,
            login_date,
            logout_date,
            price_room,
            stay_time,
            discount,
            description,
            price,
        });

        await newData.save();
        res.status(200).send({ 'msg': "با موفقیت ثبت شد" });

    } catch {
        res.status(400).send({ "msg": "خطا درارسال اطلاعات !" })
    }

};


const deleteData = async (req, res) => {
    const { id } = req.params;

    const guests = await Guest.findByIdAndDelete(id);

    res.status(200).send({ "data": "موفقیت حذف شد" });
}

const getReport30 = async (req, res) => {
    try {
        const { today = new Date(), length = 30 } = req.body
        const selectedDate = new Date(new Date(today).setDate(new Date(today).getDate() - length));
        const end = new Date(new Date(selectedDate).setDate(new Date(selectedDate).getDate() + length))

        Guest.find({ createdAt: { $gte: selectedDate, $lte: end } })
            .then(results => {
                res.json({ data: results.reverse()});
            })
            .catch(error => {
                console.error('Error retrieving data:', error);
                res.status(500).json({ error: 'An error occurred' });
            });
    } catch (error) {
        res.status(500).send(error)
        console.log('====================================');
        console.log(error);
        console.log('====================================');
    }
}

exports.getData = getData;
exports.getDataSingle = getDataSingle;
exports.getDataSlice = getDataSlice;
exports.getReports = getReports;
exports.getReportsPost = getReportsPost;
exports.postReports = postReports;
exports.postData = postData;
exports.deleteData = deleteData;
exports.getReport30 = getReport30;