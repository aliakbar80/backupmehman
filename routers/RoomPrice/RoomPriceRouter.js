const express = require('express');
const router = express.Router();

const {
    getAllPrices,
    getPriceById,
    createPrice,
    updatePrice,
    deletePrice
} = require('../../controller/RoomPrice');

// GET all room prices
router.get('/', getAllPrices);

// GET single room price by ID
router.get('/:id', getPriceById);

// POST create new room price
router.post('/', createPrice);

// PUT update room price
router.put('/:id', updatePrice);

// DELETE room price
router.delete('/:id', deletePrice);

module.exports = router;
