var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
  
    // Your port; if not 3306
    port: 3306,
  
    // Your username
    user: "root",
  
    // Your password
    password: "root",
    database: "bama"
  });
  

var askForPostOrBid = function(){
    inquirer.prompt([
        {
            type: 'list',
            message: 'Would you like to post or bid or exit?',
            choices: ['POST', 'BID', 'EXIT'],
            name: 'choice'
        }
    ])
    .then(function(answers){
        console.log(answers.choice);
        switch(answers.choice){
            case 'BID':
                bid();
                break;
            case 'POST':
                createAuction();
                break;
            default:
                connection.end();
                break;
        }
    });
};
var updateBid = function(id, bidPrice){
    connection.query("UPDATE auction SET ? WHERE ?",
        [
            { bid: bidPrice },
            { id: id}
        ],
        function(err, res){
            if(err) throw err;
            // console.log(res);
            console.log("Updating bid");
            console.log("--------");
            askForPostOrBid();
        }
    )
}
var bid = function(){
    // var auctions = [];
    // //test record
    // auctions.push({
    //     id: 1,
    //     title: "Chocolate",
    //     bid: 1.0,
    //     category: "Food"
    // });
    connection.query('SELECT * FROM auction', function(err, result){
        if(err) throw err;
        var auctions = result;
        var listChoices = [];
        for(var i = 0; i < auctions.length; i++){
            listChoices.push(auctions[i].title);
        }
        inquirer.prompt([
            {
                type: 'list',
                message: 'Which auction would you like to bid?',
                choices: listChoices,
                name: 'choice'
            },
            {
                type: 'input',
                message: "How much to bid?",
                name: 'bidPrice'
            }
        ])
        .then(function(answers){

            console.log(answers.choice);
            for(var i = 0; i < auctions.length; i++){
                if(auctions[i].title === answers.choice){
                    var previous_bid = auctions[i].bid;
                    var bidPrice = parseFloat(answers.bidPrice);
                    if(previous_bid < bidPrice){
                        // do the sql query to update
                        
                        updateBid(auctions[i].id, bidPrice);
                        
                    }
                    else{
                        console.log("Your bid is too low");
                        askForPostOrBid();
                    }
                }
            }
            
        });
    });
    
};
var createAuction = function(){
    inquirer.prompt([
        {
            type: 'list',
            message: 'Would you like to post or bid or exit?',
            choices: ['POST', 'BID', 'EXIT'],
            name: 'choice'
        }
    ])
    .then(function(answers){
        console.log(answers.choice);
    });
};

connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    // first prompt
    askForPostOrBid();

});
