function Oddnumbers(l,r)
{
    var num = [];
    for(var i = l ; i <= r ; i++)
    {
        if(i%2 !== 0)
        {
            num.push(i);
        }
    }
    return num;
}

var odd = Oddnumbers(2,7);
console.log(odd);


function findNumber(arr,k)
{
    var found = false;
    arr.forEach(function(seed)
    {
        if(seed === k)
        {
            found = true;
        }
    });
    if(found)
    {
        console.log("YES");
    }
    else
    {
        console.log("NO");
    }
}

var arr = [3,4,5,7];
var k =3;
findNumber(arr,k);