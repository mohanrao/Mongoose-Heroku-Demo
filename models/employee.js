/**
 * Created with JetBrains WebStorm.
 * User: mohanar
 * Date: 4/4/13
 * Time: 12:43 AM
 * To change this template use File | Settings | File Templates.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var EmployeeSchema  = new Schema(
    {
        name :{
            first : String,
            last : String
        },
        team : String,
        skills :[String],
        address : {
            home : {
                addressLine1 : String,
                city : String,
                pinCode : Number
            },
            office : {
                addressLine1 : String,
                city : String,
                pinCode : Number
            }
        }
    }
);

mongoose.model('employees', EmployeeSchema);
