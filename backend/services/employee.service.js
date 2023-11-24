const db = require('../db')

module.exports.getAllEmployees = async () => {    
  const records = await db.query("CALL usp_employee_crud(?,?,?,?,?,?)",
  [0,'','','',0,0])
  rec=[records[0][0]]
  return rec[0];
}

module.exports.getEmployeeById = async (id) => {
    const records = await db.query("CALL usp_employee_crud(?,?,?,?,?,?)",
    [id,'','','',0,1])
    rec=records[0][0] 
    return rec[0];
}

module.exports.deleteEmployee = async (id) => {
    const records = await db.query("CALL usp_employee_crud(?,?,?,?,?,?)",
    [id,'','','',0,2])
    rec=records[0][1]
    return rec.affectedRows;
}

module.exports.addorEditEmployee = async (obj,ID,option) => {
    const records = await db.query("CALL usp_employee_crud(?,?,?,?,?,?)",
    [ID,obj.FirstName,obj.LastName,obj.Des,obj.Salary,option])
      rec=[records[0][1]]
       return rec[0];
}
