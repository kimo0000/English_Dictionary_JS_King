const inputEl = document.querySelector("input");
const audio = document.querySelector("#audio");

async function fetchWorld(word) {
  //    console.log(word);
  try {
    audio.innerHTML = `Please wait I searching referencie For "${word}"`;

    const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
    const data = await response.json();
    console.log(data);

    // console.log(data.title)

    if(data.title === "No Definitions Found") {
      // console.log('Not Found');
      audio.innerHTML = `${data.message} ${data.resolution}`;
    } else {
      data.map((item) => {
    //   console.log(item.word);
    //   console.log(item.meanings[0].definitions[0].definition);
    //   console.log(item.phonetics[0].audio);

      return (audio.innerHTML = `
             <p>Word Title: <span class="title">${item.word}</span></p>
             <p>Meaning: <span class="definition">${item.meanings[0].definitions[0].definition}</sapn></p>
             <figure>
                <figcaption>Listen to the word:</figcaption>
                <audio
                    controls
                    src="${item.phonetics[0].audio}">
                        
                </audio>
            </figure>
        `);
    });
    }
  } catch (error) {
       audio.innerHTML = "Error Handling, Please Try A Gain!";
  }
}

inputEl.addEventListener("keyup", (e) => {
  e.preventDefault();


  //    console.log(e.target.value);
  let value = e.target.value;
  //    console.log(e.key)
  if (value != "") {
    fetchWorld(value);
  }
});
