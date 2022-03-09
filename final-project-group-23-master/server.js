var fs = require('fs');
var path = require('path');

var express = require('express');
var exphbs = require('express-handlebars');
var bodyParser = require('body-parser');
var app = express();

var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({ extended: false });

var port = process.env.PORT || 3000;

var json = fs.readFileSync('./drinks.json');
var drinks = JSON.parse(json);
var allIngreidents = [];

for(var i =0; i < drinks.drinkList.length; i++){
    currentDrink = drinks.drinkList[i];
    for (var j = 0; j < currentDrink.Ingredients.length; j++){
        if (allIngreidents.includes(currentDrink.Ingredients[j]) == false) {
            allIngreidents.push(currentDrink.Ingredients[j]);
            }
        }
}

console.log(allIngreidents);



app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(express.static('public'));

app.listen(port, function () {
    console.log("== Server is listening on port: ", port);
   
});

app.get('/public/style.css', function(req, res){
    res.status(200).sendFile(__dirname + "/public/style.css");    
});

app.get('/public/index.js', function(req, res){
    res.status(200).sendFile(__dirname + "/public/index.js");    
});

app.get('/addDrink',function(req, res){
    console.log(req.body);
    res.status(200).render("addDrink");
});

app.post('/add', urlencodedParser, function (req, res) {
    var name = req.body.drinkName;
    var ing = req.body.drinkIngredients.split(",");
    var recipe = req.body.drinkRecipe;

    if (req.body && req.body.drinkName && req.body.drinkIngredients && req.body.drinkRecipe) {

        console.log(name);
        console.log(ing);
        console.log(recipe);

        for (var i = 0; i < ing.length; i++) {
            if (!allIngreidents.includes(ing[i])) {
                allIngreidents.push(ing[i]);
                console.log(ing[i]);
            }
        }


        var newDrink = {
            "Name": name,
            "Ingredients": ing,
            "Recipe": recipe
        }
        drinks.drinkList.push(newDrink);

        fs.readFile("./drinks.json", "utf8", function readFileCallback(err, data) {
            if (err) {
                console.log(err);
            }
            else {
                updatedList = JSON.stringify(drinks, null, 2);
                fs.writeFile('./drinks.json', updatedList, 'utf8', function writeCallback(err) {
                    if (err) {
                        console.log(err);
                    }
                    console.log("== New drink added");
                });
            }
        });

        res.redirect("/");
    }
    else {
        res.redirect("/");
        console.log("== Error adding new drink. Section of form not filled out.");
    }

});



app.get('/', function(req, res){
    res.status(200).render("drinkPage",{
        drinkData: drinks.drinkList,
        ing: allIngreidents
    }); 
});

app.get('/drinks.json', function(req, res){
        res.status(200).sendFile(__dirname + "/drinks.json");
}); 

app.post("/", urlencodedParser, function (req, res){
    var searchValue = req.body.searchValue.toLowerCase();  
    var context = [];
    for(var i =0; i < drinks.drinkList.length; i++){
        currentDrink = drinks.drinkList[i];
        currentDrinkName = drinks.drinkList[i].Name.toLowerCase();
        if( currentDrinkName.search(searchValue) != -1 ){
            context.push(currentDrink);
        }
        else{
            for(var j = 0; j < currentDrink.Ingredients.length; j++){
                currentDrinkIngredient = currentDrink.Ingredients[j].toLowerCase();
                if(currentDrinkIngredient.search(searchValue) != -1){
                    context.push(currentDrink);
                }
            }
        }
    }

    //console.log(context)
    res.status(200).render("searchedDrinks",{
        drinkData: context,
        ing: allIngreidents
    }); 

});

app.post("/filter", urlencodedParser, function (req, res){
    var context = [];
    console.log(req.body.ingredients);

	if(!req.body.ingredients){
	    res.status(200).render("searchedDrinks",{
        drinkData: context,
        ing: allIngreidents
		}); 
	}
	else{
		for(var i=0;i< drinks.drinkList.length; i++){
			if(drinks.drinkList[i].Ingredients.every(v => req.body.ingredients.includes(v))){
                context.push(drinks.drinkList[i]);
			}

            
		}
		res.status(200).render("searchedDrinks",{
			drinkData: context,
			ing: allIngreidents
		}); 
	}
});

app.get("/public/images/:iimg", (req, res, next) => {
    var iimg = req.params.iimg;
    res.sendFile(path.join(__dirname, "./images/" + iimg));
});


app.get('*', function (req, res) {
    res.status(404).render("fourohfour");
});
