console.log("Client side js");


const weatherForm = document.querySelector('form');
const address = document.querySelector('input');

weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    const div = document.getElementById('forecast');
    div.innerHTML = "";
    const location = address.value;
    fetch(`http://localhost:3000/weather?address=${location}`).then((res)=> {
    res.json().then((data)=> {
        const errorHTML = `<br><p>Error: <span id="locationRes"></span></p>`
        if(data.error){
            loading.innerHTML = "";
            document.getElementById("forecast").insertAdjacentHTML('afterbegin', errorHTML);
        }else {
            loading.innerHTML = "";
            const dataHTML = `<br><p><strong>Forecast: </strong><span>${data.forecast}</span></p>`
            document.getElementById("forecast").insertAdjacentHTML('afterbegin', dataHTML);
        }
    })
})
})