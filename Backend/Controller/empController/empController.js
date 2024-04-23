const connection = require('../../Model/dbConfig')

const getData = async (req, res) => {
    const sqlquery = "SELECT * FROM employee";
    await connection.query(sqlquery, (err, result) => {
        if (err) return res.json({ Status: false, Error: "Query Error", })
        else return res.json({ Status: true, result: result.rows })
    })
}
const postData = async (req, res) => {
    const sqlquery = "INSERT INTO employee (id, task, status, duedate) VALUES ($1, $2, $3, $4)";
    const { id, task, status, duedate } = req.body;
    console.log(req.body)
    await connection.query(sqlquery, [id, task, status, duedate],
        (err, result) => {
            if (err) {
                res.status(500).send({ Status: false, err: err }); // Send error response
                console.log(err)
            } else {
                res.status(200).send({
                    Status: true, Message: "Data inserted successfully", result: result
                }); // Send success response

                // console.log(result)
            }
        });
};


const deleteData = async (req, res) => {
    const id = req.params.id;
    const sqlquery = `DELETE FROM employee WHERE id=$1`
    await connection.query(sqlquery, [id], (err, result) => {
        if (err) {
            res.send(err);
        } else {
            res.send({ Status: true, Message: "Data deleted successfully", result: result });
        }
    });
}

const updateData = async (req, res) => {
    const { task, status, duedate, completiondate } = req.body;
    console.log(req.body)
    const id = req.params.id;
    const sqlquery = `UPDATE employee SET task = $1, status = $2, dueDate = $3, completionDate = $4  WHERE id = $5`;
    await connection.query(sqlquery, [task, status, duedate, completiondate, id],
        (err, result) => {
            if (err) {
                res.status(500).send(err); // Send error response
            } else {

                res.status(200).send({
                    Status: true, Message: "Data updated successfully", result: result
                }); // Send success response 
                console.log(result)
            }
        });
}

module.exports = { getData, postData, deleteData, updateData }