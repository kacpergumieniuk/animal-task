const url_pending = 'https://petstore.swagger.io/v2/pet/findByStatus?status=pending';
const url_available = 'https://petstore.swagger.io/v2/pet/findByStatus?status=available'
const url_sold = 'https://petstore.swagger.io/v2/pet/findByStatus?status=sold'

const results = document.getElementById('results');
const input = document.getElementById('input');
const no = document.getElementById('no')
const header = document.getElementById('header')

let available_result;
let pending_result;
let sold_result;



async function Init(){
    console.log('Loading...');
    const pending_data = await fetch(url_pending);
    pending_result = await pending_data.json();
    console.log(pending_result);

    const available_data = await fetch(url_available);
    available_result = await available_data.json();
    console.log(available_result);

    const sold_data = await fetch(url_sold);
    sold_result = await sold_data.json();
    console.log(sold_result);

    console.log('Loaded...')


}





function resultsMaker(){
    results.innerHTML = "";

    if(input.value === 'Available'){
        
       
        
        available_result.forEach(el => {

            const window = document.createElement('div');
            window.className = 'result';
        
            window.innerHTML = ` <p>${el.name}</p>
            <button onclick=confirmationAsk(${el.id})>Buy</button>`
            results.appendChild(window);
        
           });
    }

   if(input.value === 'Pending'){
            
            pending_result.forEach(el => {

            const window = document.createElement('div');
            window.className = 'result';
        
            window.innerHTML = ` <p>${el.name}</p>`
            results.appendChild(window);
        
           });
    }
    
    if(input.value === 'Sold'){
            
        sold_result.forEach(el => {

        const window = document.createElement('div');
        window.className = 'result';
    
        window.innerHTML = ` <p>${el.name}</p>`
        results.appendChild(window);
    
       });
}
   
}

function removeParent(){
    document.querySelector('.confirmation').remove();
}

function confirmationAsk(id){
    header.scrollIntoView();
    
    const window = document.createElement('div');
    window.className = 'confirmation' ;
    window.innerHTML = `<p>Are you sure?</p>
    <div class="answer">
    <div class="yes" onclick=buyAnimal(${id})>Yes</div>
    <div class="no" id="no" onclick=removeParent()>No</div>
    </div>`
    document.body.appendChild(window);
}

function buyAnimal(id){
    console.log(id)
    const obj = 
{
    "id": id,
    "petId": id,
    "quantity": 0,
    "shipDate": "2021-01-19T21:20:27.538Z",
    "status": "placed",
    "complete": true
  }


const options = {
    method: 'POST',
    headers: {
        'Content-type' : 'application/json'
    },
    body:JSON.stringify(obj)
};

fetch('https://petstore.swagger.io/v2/store/order', options);

document.querySelector('.confirmation').remove();

}

Init();


/* const obj = 
{
    "id": 0,
    "petId": 0,
    "quantity": 0,
    "shipDate": "2021-01-19T21:20:27.538Z",
    "status": "placed",
    "complete": true
  }


const options = {
    method: 'POST',
    headers: {
        'Content-type' : 'application/json'
    },
    body:JSON.stringify(obj)
};

fetch('https://petstore.swagger.io/v2/store/order', options) */
