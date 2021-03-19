  document.addEventListener('DOMContentLoaded', function() {
  const elems = document.querySelectorAll('.carousel');
  const instances = M.Carousel.init(elems, {fullWidth: true});
  let aName = document.getElementById('aName')
  if (aName) {
    function nameClick() {
      const animalName = document.getElementsByClassName('animalName')[0]
      animalName.addEventListener('click', async (e) => {
        e.preventDefault()
        let h = document.getElementById('aName')
        let prev = e.target.parentNode
        const res = await fetch('http://localhost:3000/views/inputAnimal.hbs')
        const source = await res.text()
        const template = Handlebars.compile(source)
        const html = template({val:prev.textContent, id:h.id})
        e.target.parentNode.innerHTML = html
        hnew = document.getElementById('aName')
        hnew.addEventListener('submit', async (el) => {
          el.preventDefault()
          let parent = document.getElementById('aName')
          let insert = document.getElementsByClassName('animalN')[0]
          let response = await fetch(`/animal/${insert.id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              name:parent.animalN.value,
            }) 
          })
          let res = await response.json()
          alert(res)
          insert.innerHTML = getBackName(parent.animalN.value)
          nameClick()
        })
      })
    }
    nameClick()
  
    function contentClick() {
      const animalContent = document.getElementsByClassName('animalContent')[0]
      animalContent.addEventListener('click', async (e) => {
        e.preventDefault()
        let h = document.getElementById('aContent')
        let prev = e.target.parentNode
        const res = await fetch('http://localhost:3000/views/inputAnimal.hbs')
        const source = await res.text()
        const template = Handlebars.compile(source)
        const html = template({val:prev.textContent, id:h.id})
        e.target.parentNode.innerHTML = html
        hnew = document.getElementById('aContent')
        hnew.addEventListener('submit',async (el) => {
          el.preventDefault()
          let parent = document.getElementById('aContent')
          let insert = document.getElementsByClassName('animalC')[0]
          let getId = document.getElementsByClassName('animalN')[0]
          // console.log(insert.id);
          let response = await fetch(`/animal/${getId.id}/content`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              content:parent.animalN.value,
            }) 
          })
          let res = await response.json()
          insert.innerHTML = getBackContent(parent.animalN.value)
          alert(res)
          contentClick()
        })
      })
    }
    contentClick()
    function removePicture() {
      const deleteBut = Array.from(document.getElementsByClassName('remove'))
      if(deleteBut) {
        deleteBut.forEach((el) => el.addEventListener('click', async (e) => {
          e.preventDefault()
          if (e.target.className == 'removeBut') {
            console.log(e.target.parentElement);
            let response = await fetch('/animal/:id', {
              method:'DELETE',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                id:e.target.parentElement.id,
                path:e.target.id,
              }) 
            })
            let res = await response.json()
            if (res === 'Success') {
              e.target.parentElement.remove()
            }
          }
        }))
      }
    }
    removePicture()
    function getBackName (val) {
      return `${val} <img id ="aName" class = "redact animalName" src="/images/redact.png">`
    }
    function getBackContent (val) {
      return `${val} <img id ="aContent" class = "redact animalContent" src="/images/redact.png">`
    }

  }


  const listen1 = () => {
    const prices = document.querySelector('#price')
  prices.addEventListener('submit', (e) => {
    e.preventDefault()
    // console.log(e.target.id);
    if (e.target.changeMe) {
    const lastPrice = Array.from(document.getElementsByClassName("cost"))
    // console.log(lastPrice);
    lastPrice.forEach((el,i) => {
      el.innerHTML = `<input id="input${i}" value="${el.textContent}"/>`
    })
    const changeButton = document.getElementById("change")
    // console.log(changeButton);
    changeButton.remove()
    const saveButton = document.createElement("button")
    saveButton.className = "save"
    saveButton.id = "saveMe"
    saveButton.type = "submit"
    saveButton.value = "Сохранить"
    saveButton.innerText= "Сохранить"
    // console.log(saveButton);
    prices.appendChild(saveButton)
    listen2()
  }
})

}


const listen2 = () => {
  const saveTarif = document.getElementById("saveMe")
  // const prices = document.querySelector('#price')
console.log(saveTarif);
saveTarif.addEventListener('click', async (e) => {
      e.preventDefault()
      const input = Array.from(document.querySelectorAll("input"))
      // console.log(inputs);
      const arrCost = input.map(el => el.value)
      console.log(arrCost);
    
    const response = await fetch("/price",{
      method: "put",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
       big2 : arrCost[0],
       big5 : arrCost[1],
       child2: arrCost[2],
       child5: arrCost[3]
      })
    });
    const result = await response.json()
   
    const input1 = document.getElementById("input0")
    const input2 = document.getElementById("input1")
    const input3 = document.getElementById("input2")
    const input4 = document.getElementById("input3")
    input1.parentElement.innerHTML = `${result.big2}`
    input2.parentElement.innerHTML = `${result.big5}`
    input3.parentElement.innerHTML = `${result.child2}`
    input4.parentElement.innerHTML = `${result.child5}`
    const changeButton = document.createElement("button")
    changeButton.id = "change"
    changeButton.type = "submit"
    changeButton.innerText= "Изменить"
    changeButton.name = "changeMe"
    // console.log(saveButton);
    const prices = document.querySelector('#price')
    prices.appendChild(changeButton)
    const saveTarif = document.getElementById("saveMe")
    saveTarif.remove()
    listen1()
})
}

listen1()
})


