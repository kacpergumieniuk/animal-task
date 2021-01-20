//Variables

const url_pending = 'https://petstore.swagger.io/v2/pet/findByStatus?status=pending';
const url_available = 'https://petstore.swagger.io/v2/pet/findByStatus?status=available'
const url_sold = 'https://petstore.swagger.io/v2/pet/findByStatus?status=sold'

const results = document.getElementById('results');
const input = document.getElementById('input');
const no = document.getElementById('no')
const header = document.getElementById('header')
const success = document.getElementById('success')

let available_result;
let pending_result;
let sold_result;


//Init, GET request for the animals

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



//Creating a list of elements from GET request

function resultsMaker(){
    results.innerHTML = "";

    if(input.value === 'Available'){

        input.style.border = 'none'
        
        available_result.forEach(el => {

            const window = document.createElement('div');
            window.className = 'result';
        
            window.innerHTML = ` <p>${el.name}</p>
            <button onclick=confirmationAsk(${el.id})>Buy</button>`
            results.appendChild(window);
        
           });
    }

    else if(input.value === 'Pending'){

        input.style.border = 'none'
                
            
    
        pending_result.forEach(el => {

        const window = document.createElement('div');
         window.className = 'result';
        
        window.innerHTML = ` <p>${el.name}</p>`
        results.appendChild(window);
        
        });
    }
    
    else if(input.value === 'Sold'){

        input.style.border = 'none'
        
            
        sold_result.forEach(el => {

        const window = document.createElement('div');
        window.className = 'result';
    
        window.innerHTML = ` <p>${el.name}</p>`
        results.appendChild(window);
    
       });
       
       
    }   

    else{
        input.style.border = '2px solid red'
    }

}



//Onclick function after pressing BUY button.

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

//Onclick event of YES button of confirmation alert.

function buyAnimal(id){

    
    const obj = 
     {
         "id": id,
         "petId": id,
         "quantity": 0,
         "shipDate": '2021-01-20T00:59:57.909Z',
         "status": "placed",
         "complete": true
     }


    const options = {
    method: 'POST',
    headers: {
        'Content-Type' : 'application/json'
    },
    body:JSON.stringify(obj)
        };

    fetch('https://petstore.swagger.io/v2/store/order', options)
        .then(function(response){
            return response.json();
        })
        .then(function(data){
            console.log(data);
            if(data.id){
                success.style.display = 'flex';
            }
            else{
                alert("Error, someething bad happened")
            }
            })

    document.querySelector('.confirmation').remove();

}



//Additional functionality

function clearValue(){
    input.value = ''
}

function removeParent(){
    document.querySelector('.confirmation').remove();
}

function hideSuccess(){
    success.style = 'display: none;';
}

Init();


