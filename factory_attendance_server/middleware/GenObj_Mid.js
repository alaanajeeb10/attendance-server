async function QueryExecSimpleReply(Query,values=[]) {
    const promisePool = db_pool.promise();
    let rows=[];
    try {
        [rows] = await promisePool.query(Query,values);
        return rows;
    } catch (err) {
        console.log(err);
        return false;
    }
}
module.exports = { QueryExecSimpleReply };
