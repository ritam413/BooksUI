
import { formSubmision } from "./utils/connectBackend.js";

const allcard = [
  {
    title: "Attack on Titan",
    image: "https://m.media-amazon.com/images/I/61t9ie31jgL._UF1000,1000_QL80_.jpg",
    state: "COMPLETED",
    tags: ["Action", "Dark Fantasy", "War"],
    description: "Humanity fights for survival against towering man-eating giants in a brutal, war-torn world."
  },
  {
    title: "Death Note",
    image: "https://images3.alphacoders.com/722/thumb-1920-722181.png",
    state: "COMPLETED",
    tags: ["Mystery", "Thriller", "Supernatural"],
    description: "A high school genius discovers a deadly notebook that lets him kill anyone—just by writing their name."
  },
  {
    title: "Demon Slayer",
    image: "https://us.oricon-group.com/upimg/sns/0/616/img1200/bec3ffe4effcde1631619c3b8524783b.jpg",
    state: "ONGOING",
    tags: ["Action", "Adventure", "Supernatural"],
    description: "A boy wields a sword and unbreakable will to save his sister and slay demons lurking in the dark."
  },
  {
    title: "Tokyo Ghoul",
    image: "https://m.media-amazon.com/images/M/MV5BZWI2NzZhMTItOTM3OS00NjcyLThmN2EtZGZjMjlhYWMwODMzXkEyXkFqcGc@._V1_.jpg",
    state: "COMPLETED",
    tags: ["Horror", "Supernatural", "Tragedy"],
    description: "A college student’s life spirals into chaos after a deadly date turns him into a half-ghoul."
  },
  {
    title: "Naruto",
    image: "https://m.media-amazon.com/images/I/91RpwagB7uL._UF1000,1000_QL80_.jpg",
    state: "COMPLETED",
    tags: ["Shonen", "Adventure", "Ninja"],
    description: "A loud ninja with a hidden power fights to be recognized and protect his village."
  },
  {
    title: "My Hero Academia",
    image: "https://i0.wp.com/doublesama.com/wp-content/uploads/2024/10/MHA-Season-7-cover-art-1.webp?fit=640%2C853&ssl=1",
    state: "ONGOING",
    tags: ["Superhero", "Action", "School"],
    description: "In a world where almost everyone has superpowers, one powerless boy dreams of becoming a hero."
  },
  {
    title: "Chainsaw Man",
    image: "https://cdn.prod.website-files.com/65cfe20094561f14a48e5d22/65cfe20194561f14a48e8ba4_image2.jpg",
    state: "ONGOING",
    tags: ["Action", "Horror", "Dark Fantasy"],
    description: "A devil-hunting boy with a chainsaw heart battles brutal fiends and his own dark past."
  },
  {
    title: "The Girl with the Dragon Tattoo",
    image: "https://m.media-amazon.com/images/I/81YW99XIpJL._UF1000,1000_QL80_.jpg",
    state: "COMPLETED",
    tags: ["Mystery", "Thriller", "Crime"],
    description: "A journalist and a hacker uncover a twisted conspiracy buried in a powerful family’s past."
  },
  {
    title: "Gone Girl",
    image: "https://matineechat.com/wp-content/uploads/2014/10/gone-girl-poster.jpg",
    state: "COMPLETED",
    tags: ["Thriller", "Drama", "Psychological"],
    description: "A man becomes the center of media and police attention when his wife mysteriously disappears."
  },
  {
    title: "The Da Vinci Code",
    image: "https://m.media-amazon.com/images/I/71y4X5150dL.jpg",
    state: "N/A",
    tags: ["Mystery", "Historical", "Adventure"],
    description: "A symbologist and a cryptologist race through Europe to uncover secrets hidden in famous artworks."
  },
  {
    title: "Spy x Family",
    image: "https://d28hgpri8am2if.cloudfront.net/book_images/onix/cvr9781974740765/spy-x-family-the-official-guide-eyes-only-9781974740765_xlg.jpg",
    state: "ONGOING",
    tags: ["Comedy", "Spy", "Family"],
    description: "A spy, an assassin, and a telepath form a fake family—with secrets that could destroy everything."
  },
  {
    title: "Jujutsu Kaisen",
    image: "https://d28hgpri8am2if.cloudfront.net/book_images/onix/cvr9781974710027/jujutsu-kaisen-vol-1-9781974710027_xlg.jpg",
    state: "N/A",
    tags: ["Action", "Dark Fantasy", "Supernatural"],
    description: "Cursed energy, deadly sorcery, and a boy who swallows a demon’s finger to fight evil."
  },
  {
    title: "Parasyte",
    image: "https://i.pinimg.com/474x/c4/cd/13/c4cd13d02aba18381a6f7f9ae3eceb9e.jpg",
    state: "N/A",
    tags: ["Sci-Fi", "Horror", "Thriller"],
    description: "When alien parasites invade Earth and take over humans, one high schooler fights to stay human."
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
const styleImgTag = "w-full rounded-md h-48 object-cover"
const styleh3TitleBook = "font-medium text-gray-800 text-md mb-2"
const styleStateSpan = "bg-slate-200 mt-2  px-3 py-1 rounded text-xs font-extrabold"
const styleDescription = "text-sm text-gray-500 font-medium leading-snug mt-2 line-clamp-3 mb-3"
const styleTag = "bg-black bg-opacity-10 mb-3 text-gray-700 text-xs font-semibold px-2 py-1 rounded-full"
const styleTagDiv = 'mt-2 flex flex-wrap  gap-2 overflow-hidden' 


// --------- Reusable Render Function ------
function renderCards(cards) {
  cardGrid.innerHTML = '';
  cards.forEach(card => {
    if (!card.title || !card.image || !card.state) {
      console.warn("Card missing fields:", card);
    }

    //this is the skeleton of the card
    const div = document.createElement('div')
    div.classList.add('Card', ...styleDivCard.split(/\s+/))
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

    //this is the para description of the cards
    const p = document.createElement('p')
    p.textContent = card.description
    p.classList.add(...styleDescription.split(/\s+/))

    // this is the tags section :-
    const divTags = document.createElement('div')
    divTags.classList.add(...styleTagDiv.split(/\s+/))
    card.tags.map((tag) => {
      const span = document.createElement('span')
      span.textContent = tag
      span.classList.add(...styleTag.split(/\s+/))
      divTags.appendChild(span)
    })

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
    informationBookdiv.appendChild(p)
    informationBookdiv.appendChild(divTags)
    informationBookdiv.appendChild(stateSpan)

    div.appendChild(image)
    div.appendChild(informationBookdiv)
    cardGrid.appendChild(div)
  })
}

// Button Event Listener (Filter NA COMPLETED ONGOING)

// document.addEventListener('DOMContentLoaded', () => renderCards(allcard))
document.addEventListener('DOMContentLoaded', async () => {

  renderCards(allcard)

  try {
    const res = await fetch("http://localhost:5000/api/v1/books/files");
    const { success, data } = await res.json();
    if (!success) throw new Error("Failed to load books");
    
   
   allcard.push(...data)

   renderCards(allcard)
    
    
  } catch (err) {
    console.error("Error fetching books:", err);
    alert("Could not load books from backend.");
  }
});


allCardBtn.addEventListener('click', () => renderCards(allcard))
ongoinBtn.addEventListener('click', () => renderCards(allcard.filter(c => c.state === "ONGOING"
)))
completedBtn.addEventListener('click', () => renderCards(allcard.filter(c => c.state === "COMPLETED"
)))
naBtn.addEventListener('click', () => renderCards(allcard.filter(c => c.state === "N/A"
)))
//

// Now searching with Name of the Book fucntionality 
// ----Requried DOM elemnts to SEARCH -------
const serachInput = document.getElementById('serachBar')

serachInput.addEventListener('input', (e) => {
  const query = e.target.value.toLowerCase();
  const filterCards = allcard.filter(card => card.title.toLowerCase().includes(query)
  );

  renderCards(filterCards)
})
//


//---- FUNCTIONLITY of the MODAL classs-----
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


// TOGGLE URL/FILE Options
const form = document.getElementById('uploadForm')
let usingFile = true;
const toggleBtn = document.getElementById('toggleInput')

toggleBtn.addEventListener('click',()=>{

  usingFile = !usingFile;


  const fileInput = document.getElementById('imageFile')
  const urlInput = document.getElementById('imageUrl')

  if(usingFile){
    fileInput.classList.remove('hidden')
    urlInput.classList.add('hidden')
    toggleBtn.textContent= "Use URL"
  } else {
    fileInput.classList.add('hidden')
    urlInput.classList.remove('hidden')
    toggleBtn.textContent= "Use File"
  }
})

formSubmision(form)

// now for submitting form 






































































  // if(usingFile){
    
  //   // use FormData when uploading a file
  //   const formData = new FormData(form)

  //   response = await fetch("http://localhost:5000/api/v1/books/upload",{
  //     method:"POST",
  //     body: formData,
  //   })
  // }else{
  //   //use JSON   when sending a url
  //   const jasonBody = {
  //     title: form.title.value,
  //     tags: form.tags.value,
  //     description:form.description.value,
  //     imageUrl: document.getElementById("imageUrl").value
  //   };

  //   response = await fetch("http://localhost:5000/api/book/upload",{
  //     method:'POST',
  //     headers:{
  //       "Content-Type":"application/json"
  //     },
  //     body:JSON.stringify(jasonBody),
  //   })
  // }
