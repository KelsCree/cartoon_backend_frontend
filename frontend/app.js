const $myForm = document.querySelector('#create-cartoon-form')

$myForm.addEventListener('submit', handleSubmit)

function handleSubmit( event ) {
  event.preventDefault()
  const formData = new FormData( event.target )
  const newName = formData.get('name')
  const newImageUrl = formData.get('image_url')

const newCartoon = {
  name: newName,
  image_url: newImageUrl
}
createCard(newCartoon)
fetch('http://localhost:3000/cartoons', {
  method: "POST",
  headers: {
    "Accept": "application/json",
    "Content-Type": "application/json"
  },
  body: JSON.stringify( newCartoon ),
    }
  )
}

fetch('http://localhost:3000/cartoons')
  .then(response => response.json())
  .then( populateCartoons )

function createCard( cartoon ) {
  const $cartoonsContainer = document.querySelector('#cartoons-container')

  const $myCard = document.createElement('div')
  $myCard.classList.add('card')
  $myCard.id = cartoon.id

  const $cartoonTitle = document.createElement('h2')
  $cartoonTitle.innerText = cartoon.name

  const $cartoonImage = document.createElement('img')
  $cartoonImage.src = cartoon.image_url

  $myCard.append($cartoonTitle, $cartoonImage)
  $cartoonsContainer.appendChild($myCard)
}

function populateCartoons( cartoons ) {
  cartoons.forEach((cartoon => {
  createCard(cartoon)
}))}