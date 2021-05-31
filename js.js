var json;
var checked;

function dane() {
    fetch('vendor-list.json')
        .then(response => {
            return response.json();
        })
        .then(responseData => {
            return responseData.vendors;
        })
        .then(data => {
            json = data;
            lista();
        }).catch(error => {
            console.log(error);
        });
}

function lista() 
{
    const vendors = json;
    var target = document.getElementById("linijka");
    Object.keys(vendors).forEach(function (key) {
        target.innerHTML +=
            '<li>' + vendors[key].name +
            '<a class="link" href="' + vendors[key].policyUrl + '">Policy</a>' +
            '<input type="checkbox" class="form-check-input checkbox" id="flexCheckDefault" name="set" value="' + [key] + '">'
        "</li>";
    });

    var checkboxy = document.querySelectorAll('input[type="checkbox"][name=set]');
    checkboxy.forEach(function (checkbox) 
    {
        checkbox.addEventListener('change', function () 
        {
            checked =
                Array.from(checkboxy)
                .filter(i => i.checked)
                .map(i => i.value)
        })
    });
}

function writeCookie(name, value, day) 
{
    var koniec = "";
    if (day) 
    {
        var now = new Date();
        now.setTime(now.getTime() + (day * 24 * 60 * 60 * 1000));
        koniec = "; koniec=" + now.toString();
    }
    document.cookie = name + "=" + (value) + koniec + "; path=/";
}

function getCookie(name) 
{
    var ciasteczko = name + "=";
    var nazwa = document.cookie.split(';');
    for (var i=0;i<nazwa.length;i++) 
    {
        var x = nazwa[i];
        while (x.charAt(0) === ' ') x = x.substring(1, x.length);
        if (x.indexOf(ciasteczko) === 0) return x.substring(ciasteczko.length, x.length);
    }
}

function wybor(wybor) 
{
    var zaznaczone = JSON.stringify(checked);
    if (wybor === 'accept') 
    {
        writeCookie('GPDR', "accepted:" + zaznaczone, 1);
    } 
    else 
    {
        writeCookie('GPDR', "rejected", 1);
    }
}

window.onload = (function () 
{
    if (getCookie("GPDR") === undefined)
    {
        dane();
    } 
    else 
    {
        document.getElementById('lista').style.display = 'none';
    }
});