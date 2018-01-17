var faker = require("faker");

function randomdata(num)
{
    for(var i = 0; i < num ; i++)

    {
       console.log(faker.commerce.productName() + " - $" + faker.commerce.price()); 
    }
}

randomdata(10);