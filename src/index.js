

fetch ('http://localhost:3000/pups')
.then(res=>res.json())
.then(data=>{
    data.forEach(element => {
        const dogBar = document.getElementById('dog-bar')
        const dogName = document.createElement('span')
        dogName.textContent = element.name
        dogBar.appendChild(dogName)
        dogName.addEventListener('click', ()=>{
            const dogInfo = document.getElementById('dog-info') 
            dogInfo.innerHTML = `
            <img src='${element.image}'>
            <h2>${element.name}</h2>
            `
            const btn = document.createElement('button')
            const val = ()=>{
                if (element.isGoodDog){
                    btn.textContent = "Good Dog!"
                }else{
                    btn.textContent = "Bad Dog!"
                }
            }
            val()

            btn.addEventListener('click', ()=>{

                element.isGoodDog=!element.isGoodDog
                fetch(`http://localhost:3000/pups/${element.id}`,{
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({isGoodDog: element.isGoodDog })
                })
                .then(res=>res.json())
                .then(data=>{
                    val()
                })
            })
            dogInfo.appendChild(btn)
        })
    })
});


