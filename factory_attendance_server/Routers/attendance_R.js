const express = require('express');
const router = express.Router();
module.exports = router;

const attendance_Mid = require("../middleware/attendance_Mid");

router.post("/Entry", [attendance_Mid.AddEntry], (req, res) => {
    if(res.ok)
        res.status(200).json({message:"OK", Last_Id:res.insertId});
    else
        return res.status(500).json({message: res.err});
});

router.post("/Exit", [attendance_Mid.AddExit], (req, res) => {
    if(res.ok)
        res.status(200).json({message:"OK", Last_Id:res.insertId});
    else
        return res.status(500).json({message: res.err});
});

router.get("/Report", [attendance_Mid.GetMonthlyReport], (req, res) => {
    if(res.ok) {
        res.status(200).json(req.ItemsData);
    }
    else
        return res.status(500).json({message: res.err});
});
