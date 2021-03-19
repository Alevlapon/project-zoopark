

document.addEventListener('DOMContentLoaded', function() {
  const listen1 = () => {
    const prices = document.querySelector('#price')
  // console.log(prices);
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
      // console.log(arrCost);
    
    const response = await fetch("/price",{
      method: "put",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
       big2 : arrCost[0],
       big5 : arrCost[1],
       child2: arrCost[1],
       child5: arrCost[1]
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
    input4.parentElement.innerHTML = `${result.child2}`
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


