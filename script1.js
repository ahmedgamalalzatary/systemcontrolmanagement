//get elements
const title = document.getElementById("title")
const price = document.getElementById("price")
const taxes = document.getElementById("taxes")
const ads = document.getElementById("ads")
const discount = document.getElementById("discount")
const total = document.getElementById("total")
const count = document.getElementById("count")
const category = document.getElementById("category")
const submit = document.getElementById("submit")
let mood = 'create'
let temp;
//get total

function getTotal() {
    if (price.value !== ' ') {
        let result = (+price.value + +taxes.value + +ads.value) - +discount.value
        total.innerHTML = result
    }
    else {
        total.innerHTML = '0'
    }
}

//update items

function updatedata(i) {
    title.value = datapro[i].title;
    price.value = datapro[i].price;
    taxes.value = datapro[i].taxes;
    ads.value = datapro[i].ads;
    discount.value = datapro[i].discount;
    category.value = datapro[i].category;
    getTotal();
    count.style.display = 'none';
    submit.innerHTML = 'update';
    mood = 'update';
    temp = i;
    scroll({ top: 0, behavior: "smooth" })
}


//create items

if (localStorage.dataproduct != null) {
    dataproduct = JSON.parse(localStorage.dataproduct)
}


if (localStorage.product != null) {
    datapro = JSON.parse(localStorage.product)
} else {
    datapro = [];
}

submit.onclick = function () {
    let newpro = {
        title: title.value,
        ads: ads.value,
        discount: discount.value,
        count: count.value,
        taxes: taxes.value,
        total: total.innerHTML,
        category: category.value,
        price: price.value,

    }
    //validate date format
    if (title.value !== '' && price.value !== '' && ads.value !== '' && taxes.value !== '' && category.value !== '' && price.value !== '' && count.value < 20) {
        //count items
        if (mood === 'create') {
            if (newpro.count >= 1) {
                for (let i = 0; i < newpro.count; i++) {
                    datapro.push(newpro)
                }
            } else {
                datapro.push(newpro)
            }
        } else {
            datapro[temp] = newpro;
            mood = 'create';
            submit.innerHTML = 'Create';
            count.style.display = 'block';
            clearItems()
        }
    }
    //save product in local storage
    localStorage.setItem('product', JSON.stringify(datapro))

    readItems()
}

// delete items

function deletedata(i) {
    datapro.splice(i, 1)
    localStorage.product = JSON.stringify(datapro)
    readItems()
}



//clear inputs fields

function clearItems() {
    title.value = ''
    price.value = ''
    taxes.value = ''
    total.innerHTML = ''
    ads.value = ''
    discount.value = ''
    category.value = ''
    count.value = ''
}

//read items and show items
function readItems() {
    getTotal()
    let table = '';
    for (let i = 0; i < datapro.length; i++) {
        table += `
        <tr>
            <td>${i + 1}</td>
            <td>${datapro[i].title}</td>
            <td>${datapro[i].price}</td>
            <td>${datapro[i].taxes}</td>
            <td>${datapro[i].ads}</td>
            <td>${datapro[i].discount}</td>
            <td>${datapro[i].category}</td>
            <td>${datapro[i].total}</td>
            <td><button onclick = 'updatedata(${i})' class="update table__button button ">update</button></td>
            <td><button onclick = 'deletedata(${i})' class="delete table__button button ">delete</button></td>
        </tr>`;

    }
    document.getElementById('tbody').innerHTML = table;
    let btn = document.getElementById('deleteall')
    if (
        datapro.length > 0) {
        btn.innerHTML = `<button onclick="deleteall()" id='submit' class="button clearall">Delet All ( ${datapro.length} )</button>`
    } else {
        btn.innerHTML = ''
    }
}

readItems()


//clear all items function
function deleteall() {
    localStorage.clear();
    datapro.splice(0);
    readItems();
}


// search items 

let searchMood = 'title';

function getSearch(id) {
    const search = document.getElementById("search");
    const searchOptions = {
        'search__title': 'title',
        'search__category': 'category',
        'search__price': 'price',
        'search__discount': 'discount',
        'search__taxes': 'taxes',
        'search__total': 'total'
    };

    if (searchOptions[id]) {
        searchMood = searchOptions[id];
        search.placeholder = 'Search by ' + searchMood;
    }

    search.focus();
    search.value = '';
    readItems();
}

function searchdata(value) {
    const searchValue = value.toLowerCase(); // Convert the search term to lowercase
    let table = '';

    for (let i = 0; i < datapro.length; i++) {
        switch (searchMood) {
            case 'title':
                if (datapro[i].title.toLowerCase().includes(searchValue)) {
                    table += createTableRow(datapro[i], i);
                }
                break;
            case 'category':
                if (datapro[i].category.toLowerCase().includes(searchValue)) {
                    table += createTableRow(datapro[i], i);
                }
                break;
            case 'price':
                if (datapro[i].price.toString().includes(searchValue)) {
                    table += createTableRow(datapro[i], i);
                }
                break;
            case 'discount':
                if (datapro[i].discount.toString().includes(searchValue)) {
                    table += createTableRow(datapro[i], i);
                }
                break;
            case 'taxes':
                if (datapro[i].taxes.toString().includes(searchValue)) {
                    table += createTableRow(datapro[i], i);
                }
                break;
            case 'total':
                if (datapro[i].total.toString().includes(searchValue)) {
                    table += createTableRow(datapro[i], i);
                }
                break;
        }
    }

    document.getElementById('tbody').innerHTML = table;
}

function createTableRow(data, index) {
    return `
    <tr>
        <td>${index + 1}</td>
        <td>${data.category}</td>
        <td>${data.price}</td>
        <td>${data.taxes}</td>
        <td>${data.ads}</td>
        <td>${data.discount}</td>
        <td>${data.category}</td>
        <td>${data.total}</td>
        <td><button onclick="updatedata(${index})" class="update table__button button">update</button></td>
        <td><button onclick="deletedata(${index})" class="delete table__button button">delete</button></td>
    </tr>`;
}





