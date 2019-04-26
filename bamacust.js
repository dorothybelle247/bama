
var mysql = require('mysql');

var inquirer = require('inquirer');

var Table = require('easy-table');



// var data =  'SELECT * FROM Products';

var connection = mysql.createConnection({
    host: "localhost",
  
    // Your port; if not 3306
    port: 3306,
  
    // Your username
    user: "root",
  
    // Your password
    password: "root",
    database: "greatbay_db"
  });

connection.connect(function(err) {

    if (err) throw err;

    console.log("connected as id " + connection.threadId);

});

// Function Start

function start() {

    // Display all the products

    var ew = new Table;

   

    connection.query('SELECT * FROM Products', function(err, result) {

        if (err) throw err;

        console.log('\n<----------Buy something---------->\n' .magenta.bold);



        result.forEach(function(itemTable) {

            ew.cell('Department Id'.blue , itemTable.DepartmentID)

            ew.cell('Product'.blue , itemTable.ProductName)

            ew.cell('Department Name'.blue , itemTable.DepartmentName)

            ew.cell('Price'.blue , itemTable.Price)
            ew.newRow()

        });

        console.log(ew.toString());



        inquirer.prompt([{

            name: "getId",

            type: "input",

            message: "What is the ID of the product you would like to buy?".cyan,

            // validate the value if it is empty don't move to the next prompt

            validate: function(value) {

                if (isNaN(value) == false && parseInt(value) <= result.length && parseInt(value) > 0) {

                    return true;

                } else {

                    return false;

                }

            }

        }, {

            name: "qty",

            type: "input",

            message: "How many units of the product you would like to buy?".red,

            validate: function(value) {

                if (isNaN(value) == false && parseInt(value) > 0) {

                    return true;

                } else {

                  // console.log("Please type sufficiant amout of the item you would like to buy");

                    return false;



                }

            }

        }]).then(function(pick) {

            // store total value as a variable

            var grandTotal = ((result[(pick.getId) - 1].Price) * parseInt(pick.qty)).toFixed(2);



            if (result[(pick.getId) - 1].StockQuantity >= parseInt(pick.qty)) {

                //after purchase, updates quantity in Products

                connection.query("UPDATE Products SET ? WHERE ?", [

                    { StockQuantity: (result[(pick.getId) - 1].StockQuantity - parseInt(pick.qty)) },

                    { ItemID: pick.getId }

                ], function(err, result) {

                    if (err) throw err;

                    console.log("\nPurchase Successful! Your total is $" + grandTotal + ".");

                    askAgain();

                });

            } else {

                console.log("Wrong".red);

                askAgain();

            }

        });

    });

}



// var askForPostOrBid = function(){
//     inquirer.prompt([
//         {
//             type: 'list',
//             message: 'Would you like to post or bid or exit?',
//             choices: ['POST', 'BID', 'EXIT'],
//             name: 'choice'
//         }
//     ])
//     .then(function(answers){
//         console.log(answers.choice);
//         switch(answers.choice){
//             case 'BID':
//                 bid();
//                 break;
//             case 'POST':
//                 createAuction();
//                 break;
//             default:
//                 connection.end();
//                 break;
//         }
//     });
// };







function askAgain() {

    inquirer.prompt([{

        name: "plus",

        type: "confirm",

        message: "Pick an item of your choice?"

    }]).then(function(pick) {

        if (pick.plus) {

            start();

        } else {

            console.log("\nThank you for Shopping!".white);

        }

    });

}

start();