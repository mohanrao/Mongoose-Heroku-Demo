/**
 * Created with JetBrains WebStorm.
 * User: mohanar
 * Date: 4/4/13
 * Time: 9:07 AM
 * To change this template use File | Settings | File Templates.
 */
var mongoose = require('mongoose'),
    Employee = mongoose.model('employees')
    //,Address = mongoose.model('Address');
/**
 * Get Employees Listing
 */
exports.index  = function(req,res){
    Employee.find( function(err, employees) {
        if (err) return res.render('Error occurred');
        res.send(employees);
    });
};

exports.findById = function(req,res){
    Employee.findById( req.params.id, function( err, employee ) {
            if (err) {
                res.send('Error occurred');
                return console.log(err);
            }
            res.send(employee);
    });
};

exports.newEmployee = function(req,res){
    var emp = new Employee(req.body);

    emp.save(function(err){
        if (err) {
            res.send('Error occurred');
            return console.log(err);
        }
        res.send(emp);
    });
}

exports.update = function(req,res){
    Employee.findById( req.params.id, function( err, employee ) {
        if(!employee){
            res.send('Employee not found with given id');
        }else{
            if(employee.__v != req.body.__v){
                return res.send('Please use the update employee details as ' + employee);
            }
            employee.set(req.body)
            if(employee.isModified()){
                employee.increment();
                employee.save(function(err){
                    if (err) {
                        res.send('Error occurred');
                        return console.log(err);
                    }
                    res.send(employee);
                });
            }else{
                res.send(employee);
            }

        }
    });
};

exports.delete = function(req,res){
    Employee.findById( req.params.id, function( err, employee ) {
        if(!employee){
            return res.send('Employee not found with given id');
        }
        employee.remove(function(err){
            if (err) {
                res.send('Error occurred');
                return console.log(err);
            }
            res.send('Deleted')
        });
    });
};