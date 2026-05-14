const { query } = require('../database');
const { SQL_ERROR_CODE, UNIQUE_VIOLATION_ERROR, RAISE_EXCEPTION } = require('../errors');

module.exports.retrieveAll = function retrieveAll() {
    // retrieve students via stored procedure
    const sql = `SELECT adm_no, stud_name, gender, crse_code, gpa, gpa_last_updated
    FROM student`;
    return query(sql).then(function (result) {
        return result.rows;
    });
};
module.exports.enrolNewStudent = function enrolNewStudent(
    adminNumber,
    studentName,
    gender,
    address,
    dob,
    nationality,
    courseCode
) {
    const sql = 'CALL enrol_new_student($1, $2, $3, $4, $5, $6, $7, $8)';

    return query(sql, [
        adminNumber,
        studentName,
        gender,
        address,
        dob,
        nationality,
        courseCode,
        ''
    ])
        .then(function (result) {
            console.log(result); // For debugging purpose

            if (result.rows.length == 1 && result.rows[0].errMsg) {
                // Check if there is an error message
                throw new RAISE_EXCEPTION(result.rows[0].errMsg);
            }

            return result;
        })
        .catch(function (error) {
            if (error.code === SQL_ERROR_CODE.UNIQUE_VIOLATION) {
                throw new UNIQUE_VIOLATION_ERROR(
                    `Student with adm no ${adminNumber} already exists! Cannot create duplicate.`
                );
            }

            if (error.code === SQL_ERROR_CODE.RAISE_EXCEPTION) {
                throw new RAISE_EXCEPTION(error.message);
            }

            throw error;
        });
};