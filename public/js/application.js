document.addEventListener('DOMContentLoaded', function() {
  
  document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.parallax');
    var instances = M.Parallax.init(elems, options);
  });
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
});

