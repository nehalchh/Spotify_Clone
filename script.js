async function getsongs() {
  let a = await fetch("http://127.0.0.1:5500/songsSpotify/");
  let response = await a.text();
  let div = document.createElement("div");
  div.innerHTML = response;
  let as = div.getElementsByTagName("a");
  let songs = [];
  for (let index = 0; index < as.length; index++) {
    const element = as[index];
    if (element.href.endsWith(".mp3")) {
      let song = decodeURIComponent(element.href.split(/songsSpotify/)[1]);
      // Remove the prefix and suffix
      song = song
      .replaceAll("/", "")
      
      songs.push(song);
    }
  }
  return songs;
}

const playmusic = (track) => {
  let audio = new Audio("/songsSpotify/" + track)
  audio.play(); 
}

async function main() {

  let currentsong;

  let songs = await getsongs();
  console.log(songs);

  let songUL = document.querySelector("#toplay").getElementsByTagName("ul")[0];
  for (const song of songs) {
    songUL.innerHTML += `<li>
                        <div id="burder">
                            <img id="play1img" src="play1.svg" alt="play btn">
                            <div id="boree">
                                <div id="sona">
                                    ${song}
                                </div>
                                <div id="soar">
                                    Neymar
                                </div>
                            </div>
                            <img id="ppplay" src="play.svg" alt="playbtn">
                        </div>
    </li>`;
  }

  Array.from(document.querySelector("#toplay").getElementsByTagName("li")).forEach(e => {
    e.addEventListener("click", element => {
      console.log(e.querySelector("#boree").firstElementChild.innerHTML)
      playmusic(e.querySelector("#boree").firstElementChild.innerHTML.trim())
    })
})

return songs;
}

main();