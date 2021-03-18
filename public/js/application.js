document.addEventListener('DOMContentLoaded', function() {

  const prices = document.querySelector('#price')
  prices.addEventListener('submit', (e) => {
    e.preventDefault()
    const lastPrice = document.getElementsByClassName("cost")
    console.log(lastPrice);
    // const response = fetch()
  })

  const elems = document.querySelectorAll('.carousel');
  const instances = M.Carousel.init(elems, {fullWidth: true});
  let a = document.getElementById('aName')
  if (a) {
    function nameClick() {
      const animalName = document.getElementsByClassName('animalName')[0]
      animalName.addEventListener('click', async (e) => {
        e.preventDefault()
        let h = document.getElementById('aName')
        let prev = e.target.parentNode
        console.log(prev);
        const res = await fetch('http://localhost:3000/views/inputAnimal.hbs')
        console.log(res);
        const source = await res.text()
        console.log(source);
        const template = Handlebars.compile(source)
        console.log(template);
        const html = template({val:prev.textContent, id:h.id})
        console.log(html);
        e.target.parentNode.innerHTML = html
        hnew = document.getElementById('aName')
        hnew.addEventListener('submit', async (el) => {
          el.preventDefault()
          let parent = document.getElementById('aName')
          let insert = document.getElementsByClassName('animalN')[0]
          console.log(insert);
          console.log(insert.id);
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
  
    function getBackName (val) {
      return `${val} <img id ="aName" class = "redact animalName" src="/images/redact.png">`
    }
    function getBackContent (val) {
      return `${val} <img id ="aContent" class = "redact animalContent" src="/images/redact.png">`
    }

  }
});

