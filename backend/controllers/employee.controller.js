const express = require('express'),
    router = express.Router()

const service = require('../services/employee.service')

//http://localhost:3000/employees/
router.get('/employee', async (req, res) => {
    const employees = await service.getAllEmployees()
    res.send(employees)
})

router.get('/employee/:id', async (req, res) => {
    const employee = await service.getEmployeeById(req.params.id)
    if (employee == undefined)
        console.log('no record with given id : ' + req.params.id)
    else
       res.send({
        message:'all emp data',
        data:employee
    });
})

router.delete('/employee/:id', async (req, res) => {
    const affectedRows = await service.deleteEmployee(req.params.id)
    if (affectedRows == 0)
      console.log('no record with given id : ' + req.params.id)     
    else
    res.send({
        message:"Deleted"
    })
})

router.post('/employee/', async (req, res) => {
   const results = await service.addorEditEmployee(req.body,0,3)
    res.send({
        message:"created",
        data:results
    })
})

router.put('/employee/:id', async (req, res) => {
 const results  = await service.addorEditEmployee(req.body,req.params.id,4)
      res.send({
        message:"updated",
        data:results
    }) 
})

module.exports = router;
