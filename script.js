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
        .replace("/Y2meta.app - ", "")
        .replace(" (128 kbps).mp3", "")
        .replace(
          "Shah Rukh Khan & Mahira Khan _ Arijit Singh & Harshdeep Kaur _ JAM8 _",
          ""
        )
        .replace(
          " (Official Video) ft. Pharrell Williams, Katy Perry, Big Sean",
          ""
        )
        .replaceAll(
            "_", "-"
        );
      songs.push(song);
    }
  }
  return songs;
}

async function main() {
  let songs = await getsongs();
  console.log(songs);

  let songUL = document.querySelector("#toplay").getElementsByTagName("ul")[0];
  for (const song of songs) {
    songUL.innerHTML += `<li><div id="burder">
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

  var audio = new Audio(songs[0]);
  audio.play();
  audio.addEventListener("loadeddata", () => {
    console.log(audio.duration, audio.currentSrc, audio.currentTime);
  });
}

main();