async function chatGptPost(msg) {
  console.log(msg);
  try {
    const url = 'https://alpha-papa-india.paternaloil.repl.co/ai'; // URL to post to
    console.log(JSON.stringify(msg))
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json' // Tells the server this is JSON
      },
      body: JSON.stringify(msg) // Wrap msg in an object before stringifying
    });
    const result = await response.json(); // Get response
    return result; // Return OpenAI's response
  } catch (err) {
    console.log('api error');
    return 'err';
  }
}
async function makeBubbles() {
  generating = true
  let newChatBubble = document.createElement('div'); // Make new elements programmatically 
  let newChatText = document.createElement('p');
  newChatText.textContent = txtBox.value
  newChatBubble.classList.add('chat-bubble') // Add in styles and stuff like inner elements 
  newChatBubble.classList.add('user')
  newChatBubble.appendChild(newChatText)
    
  chats.appendChild(newChatBubble)
    
  messages.push({role: "user", content: txtBox.value})
  let response = await chatGptPost(messages)
  if (response == "err") {
    let newResBubble = document.createElement('div')
    let newResText = document.createElement('p')
    newResText.textContent = "openai error"
    newResBubble.classList.add('chat-bubble')
    newResBubble.classList.add('err')
    newResBubble.appendChild(newResText)
  
    chats.appendChild(newResBubble)
    return;
  } 
  messages.push(response)
  let newResBubble = document.createElement('div')
  let newResText = document.createElement('p')
  newResText.textContent = response.content
  newResBubble.classList.add('chat-bubble')
  newResBubble.classList.add('assistant')
  newResBubble.appendChild(newResText)

  chats.appendChild(newResBubble)
}

let inputBtn = document.querySelector('button'); // Lets script interact with html elements
let txtBox = document.querySelector('input'); 
let chats = document.querySelector('.chats');
let generating = false
let messages = []

inputBtn.onclick = () => {
  if (!generating) { 
    makeBubbles();
    txtBox.value = ""
    generating = false
  } else {  
    console.log('cannot speak while awaiting api response')
  }
}