/**
 * 
 * 
 * 
 **/

var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');

/*
// BUDGET LIST
// * each list has a user
// *  0 or more items
*/
var Budget = new mongoose.Schema({
  type: String,
  amount: Number,
  totalSpent: Number,
  spendingLeft: Number
});

/* EXPENSE LIST
// * list must have a  user
// * 0 or more items 
 */
var Expense = new mongoose.Schema({
  type: String,
  amount: Number,
  description: String,
  created : {
    type: Date,
    default: Date.now
  }
});

var User = new mongoose.Schema({
    username: String,
    password: String,
    budgetList: [Budget],
    expenseList: [Expense],

});

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);

mongoose.model("Budget", Budget);
mongoose.model("Expense", Expense);

// (3) connect to database
let dbconf; 
//put this before you connect
// is the environment variable, NODE_ENV, set to PRODUCTION? 
if (process.env.NODE_ENV == 'PRODUCTION') {
 // if we're in PRODUCTION mode, then read the configration from a file
 // use blocking file io to do this...
 var fs = require('fs');
 var path = require('path');
 var fn = path.join(__dirname, 'config.json');
 var data = fs.readFileSync(fn);

 // our configuration file will be in json, so parse it and set the
 // conenction string appropriately!
 var conf = JSON.parse(data);
 dbconf = conf.dbconf;
} else {
 // if we're not in PRODUCTION mode, then use
 dbconf = 'mongodb://localhost/jf2920-final-project';
}

console.log(dbconf);
mongoose.connect(dbconf); 






