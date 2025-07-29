
const allcard = [
  {
    title: "Attack on Titan",
    image: "https://m.media-amazon.com/images/I/61t9ie31jgL._UF1000,1000_QL80_.jpg",
    state: "COMPLETED"
  },
  {
    title: "Death Note",
    image: "https://images3.alphacoders.com/722/thumb-1920-722181.png",
    state: "COMPLETED"
  },
  {
    title: "Demon Slayer",
    image: "https://us.oricon-group.com/upimg/sns/0/616/img1200/bec3ffe4effcde1631619c3b8524783b.jpg",
    state: "ONGOING"
  },
  {
    title: "Tokyo Ghoul",
    image: "https://m.media-amazon.com/images/M/MV5BZWI2NzZhMTItOTM3OS00NjcyLThmN2EtZGZjMjlhYWMwODMzXkEyXkFqcGc@._V1_.jpg",
    state: "COMPLETED"
  },
  {
    title: "Naruto",
    image: "https://m.media-amazon.com/images/I/91RpwagB7uL._UF1000,1000_QL80_.jpg",
    state: "COMPLETED"
  },
  {
    title: "My Hero Academia",
    image: "https://i0.wp.com/doublesama.com/wp-content/uploads/2024/10/MHA-Season-7-cover-art-1.webp?fit=640%2C853&ssl=1",
    state: "ONGOING"
  },
  {
    title: "Chainsaw Man",
    image: "https://cdn.prod.website-files.com/65cfe20094561f14a48e5d22/65cfe20194561f14a48e8ba4_image2.jpg",
    state: "ONGOING"
  },
  {
    title: "The Girl with the Dragon Tattoo",
    image: "https://m.media-amazon.com/images/I/81YW99XIpJL._UF1000,1000_QL80_.jpg",
    state: "COMPLETED"
  },
  {
    title: "Gone Girl",
    image: "https://matineechat.com/wp-content/uploads/2014/10/gone-girl-poster.jpg",
    state: "COMPLETED"
  },
  {
    title: "The Da Vinci Code",
    image: "https://m.media-amazon.com/images/I/71y4X5150dL.jpg",
    state: "N/A"
  },
  {
    title: "Spy x Family",
    image: "https://d28hgpri8am2if.cloudfront.net/book_images/onix/cvr9781974740765/spy-x-family-the-official-guide-eyes-only-9781974740765_xlg.jpg",
    state: "ONGOING"
  },
  {
    title: "Jujutsu Kaisen",
    image: "https://d28hgpri8am2if.cloudfront.net/book_images/onix/cvr9781974710027/jujutsu-kaisen-vol-1-9781974710027_xlg.jpg",
    state: "N/A"
  },
  {
    title: "Parasyte",
    image: "https://i.pinimg.com/474x/c4/cd/13/c4cd13d02aba18381a6f7f9ae3eceb9e.jpg",
    state: "N/A"
  }
];

// ----- DOM ELEMENTS ------
const cardGrid = document.getElementById('CardContainer')
const allCardBtn = document.getElementById('allBtn')
const ongoinBtn = document.getElementById('ongoingBtn')
const naBtn = document.getElementById('nabtn')
const completedBtn = document.getElementById('completedBtn')

// ----------Resuable Styles ---------
const styleDivCard = "card-hover bg-white border-4  p-1 rounded-lg overflow-hidden relative"
const styleImgTag ="w-full h-48 object-cover" 
const styleh3TitleBook = "font-medium text-gray-800 text-sm mb-2"
const styleStateSpan = "bg-slate-200  px-3 py-1 rounded text-xs font-extrabold"

// --------- Reusable Render Function ------
function renderCards(cards){
  cardGrid.innerHTML='';
  cards.forEach(card=>{
      if (!card.title || !card.image || !card.state) {
      console.warn("Card missing fields:", card);
      }
    
        //this is the skeleton of the card
      const div = document.createElement('div')
      div.classList.add('Card',...styleDivCard.split(/\s+/))
      div.setAttribute('name', card.state)
    
        // this is the image in the skeleton
      const image = document.createElement('img')
      image.src = card.image
      image.classList.add(...styleImgTag.split(/\s+/))

        //this is the text portion of the card
      const informationBookdiv = document.createElement('div')
      informationBookdiv.classList.add("p-3")

        //this is the heading of the book child of the informationbookdiv 
      const h3 = document.createElement('h3')
      h3.classList.add(...styleh3TitleBook.split(/\s+/))
      h3.textContent = card.title

        // this is the stateSpan , child of the informationbookdiv
      const stateSpan = document.createElement('span')
      stateSpan.classList.add(...styleStateSpan.split(/\s+/))
      stateSpan.textContent = card.state


    // ✅ 2. Border and Color Styling
      switch (card.state) {
        case 'ONGOING':
          div.classList.add('border-green-500');
          stateSpan.classList.add('text-green-600');
          break;
        case 'COMPLETED':
          div.classList.add('border-red-500');
          stateSpan.classList.add('text-red-600');
          break;
        default:
          div.classList.add('border-blue-500');
          stateSpan.classList.add('text-blue-600');
      }
  
      informationBookdiv.appendChild(h3)
      informationBookdiv.appendChild(stateSpan)
  
      div.appendChild(image)
      div.appendChild(informationBookdiv)
      cardGrid.appendChild(div)
  })
}

// Button Event Listener (Filter NA COMPLETED ONGOING)
  document.addEventListener('DOMContentLoaded',()=> renderCards(allcard))
  allCardBtn.addEventListener('click',()=>renderCards(allcard))
  ongoinBtn.addEventListener('click',()=>renderCards(allcard.filter(c=>c.state === "ONGOING"
  )))
  completedBtn.addEventListener('click',()=>renderCards(allcard.filter(c=>c.state === "COMPLETED"
  )))
  naBtn.addEventListener('click',()=>renderCards(allcard.filter(c=> c.state === "N/A"
  )))
//

// Now searching with Name of the Book fucntionality 
// ----Requried DOM elemnts to SEARCH -------
  const serachInput = document.getElementById('serachBar')

  serachInput.addEventListener('input',(e)=>{
    const query = e.target.value.toLowerCase();
    const filterCards = allcard.filter(card=> card.title.toLowerCase().includes(query)
    );

    renderCards(filterCards)
  })
//


// this is the functionlity of the modal classs
//-----DOM ELEMENTS of Modal -------
const openModalButton = document.getElementById('openModalBtn')
const modalcontainer = document.getElementById('bookModal')

// event listener to achieve the functionlity
openModalButton.addEventListener('click', () => {
  modalcontainer.classList.remove('hidden')
  modalcontainer.classList.add('flex')
})
const cancelBtn = document.getElementById('cancel')
cancelBtn.addEventListener('click', () => {
  console.log("i am touched");
  modalcontainer.classList.remove('flex')
  modalcontainer.classList.add('hidden')
})


