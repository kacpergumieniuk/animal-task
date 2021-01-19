const url_pending = 'https://petstore.swagger.io/v2/pet/findByStatus?status=pending';
const url_available = 'https://petstore.swagger.io/v2/pet/findByStatus?status=available'
const url_sold = 'https://petstore.swagger.io/v2/pet/findByStatus?status=sold'

const results = document.getElementById('results');
const input = document.getElementById('input');

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
            <button>Buy</button>`
            results.appendChild(window);
        
           });
    }

   if(input.value === 'Pending'){
            
            pending_result.forEach(el => {

            const window = document.createElement('div');
            window.className = 'result';
        
            window.innerHTML = ` <p>${el.name}</p>
            <button>Buy</button>`
            results.appendChild(window);
        
           });
    }
    
    if(input.value === 'Sold'){
            
        sold_result.forEach(el => {

        const window = document.createElement('div');
        window.className = 'result';
    
        window.innerHTML = ` <p>${el.name}</p>
        <button>Buy</button>`
        results.appendChild(window);
    
       });
}
   
}

Init();