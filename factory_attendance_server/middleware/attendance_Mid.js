let tableName="workers_log";

async function AddEntry(req,res,next){
    // קבלת נתונים מהטופס
    let worker_id   = req.body.worker_id   || "";
    let full_name   = req.body.full_name   || "";
    let note        = req.body.note        || "";

    res.ok=false;
    res.err="";

    // בדיקת שדות חובה
    if(worker_id === "" || full_name === ""){
        res.err="wrong parameters";
        return next();
    }

    // שמירת כניסה לבסיס הנתונים
    const Query = `INSERT INTO ${tableName} (worker_id, full_name, action_type, action_date, action_time, note) VALUES (?, ?, 'IN', CURDATE(), CURTIME(), ?)`;
    let values = [worker_id, full_name, note];
    let rows= await GenObj_Mid.QueryExecSimpleReply(Query,values);
    if(rows === false){
        res.err="חלה תקלה, נא לנסות שנית";
        return res.status(500).json({status:"ERROR",Query: Query,err:res.err,values:values});
    }
    res.ok=true;
    res.insertId = rows.insertId;
    next();
}

async function AddExit(req,res,next){
    // קבלת נתונים מהטופס
    let worker_id   = req.body.worker_id   || "";
    let full_name   = req.body.full_name   || "";
    let note        = req.body.note        || "";

    res.ok=false;
    res.err="";

    // בדיקת שדות חובה
    if(worker_id === "" || full_name === ""){
        res.err="wrong parameters";
        return next();
    }

    // שמירת יציאה לבסיס הנתונים
    const Query = `INSERT INTO ${tableName} (worker_id, full_name, action_type, action_date, action_time, note) VALUES (?, ?, 'OUT', CURDATE(), CURTIME(), ?)`;
    let values = [worker_id, full_name, note];
    let rows= await GenObj_Mid.QueryExecSimpleReply(Query,values);
    if(rows === false){
        res.err="חלה תקלה, נא לנסות שנית";
        return res.status(500).json({status:"ERROR",Query: Query,err:res.err,values:values});
    }
    res.ok=true;
    res.insertId = rows.insertId;
    next();
}

async function GetMonthlyReport(req,res,next){
    // מקבלים חודש ושנה מהכתובת
    let month = req.query.month || "";
    let year  = req.query.year  || "";

    res.ok=false;
    res.err="";

    if(month === "" || year === ""){
        res.err="wrong parameters";
        return next();
    }

    // שליפת כל הכניסות והיציאות בחודש שנבחר
    let Query = `SELECT id, worker_id, full_name, action_type, DATE_FORMAT(action_date,'%Y-%m-%d') as action_date, action_time, note FROM ${tableName} `;
    Query += ` WHERE MONTH(action_date)=? AND YEAR(action_date)=? `;
    Query += ` ORDER BY action_date, action_time `;
    let values = [month, year];

    let rows= await GenObj_Mid.QueryExecSimpleReply(Query,values);
    if(rows === false){
        res.err="חלה תקלה, נא לנסות שנית";
        return res.status(500).json({status:"ERROR",Query: Query,err:res.err,values:values});
    }
    res.ok=true;
    req.ItemsData={list:rows};
    next();
}

module.exports = { AddEntry, AddExit, GetMonthlyReport };
