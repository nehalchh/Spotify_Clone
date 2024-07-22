let currentsong= new Audio();
let songs;
let currfolder;

function secondsToMinutesSeconds(seconds) {
  if (isNaN(seconds) || seconds < 0) {
      return "00:00";
  }

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);

  const formattedMinutes = String(minutes).padStart(2, '0');
  const formattedSeconds = String(remainingSeconds).padStart(2, '0');

  return `${formattedMinutes}:${formattedSeconds}`;
}


async function getsongs(folder) {
  currfolder= folder;
  let a = await fetch(`http://127.0.0.1:5500/${folder}/`);
  let response = await a.text();
  let div = document.createElement("div");
  div.innerHTML = response;
  let as = div.getElementsByTagName("a");
  let songs = [];
  for (let index = 0; index < as.length; index++) {
    const element = as[index];
    if (element.href.endsWith(".mp3")) {
      let song = decodeURIComponent(element.href.split(`${folder}`)[1]);
      // Remove the prefix and suffix
      song = song
      .replaceAll("/", "") 
      
      songs.push(song);
    }
  }

  let songUL = document.querySelector("#toplay").getElementsByTagName("ul")[0];
  songUL.innerHTML= "";
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

const playmusic = (track, pause= false) => {
  // let audio = new Audio("/songsSpotify/" + track)
  currentsong.src= `/${currfolder}/` + track 
  if(!pause){
    currentsong.play()
  }

  currentsong.play(); 
  document.querySelector("#songinfo").innerHTML= decodeURI(track)
  document.querySelector("#songtime").innerHTML= "00:00 / 00:00"
}




async function main() {
  songs = await getsongs("songsSpotify/cs");
  playmusic(songs[0], true)


//attach an event listener to add prev and next
middlebutton= document.querySelector("#middlebutton")
middlebutton.addEventListener("click", () =>{
  if(currentsong.paused){
    currentsong.play()
  }
  else{
    currentsong.pause()
  }
})
pauseicon= document.querySelector(".pause-icon")
pauseicon.addEventListener("click", () =>{
  if(currentsong.paused){
    currentsong.play()
  }
  else{
    currentsong.pause()
  }
})

currentsong.addEventListener("timeupdate", () => {
  document.querySelector("#songtime").innerHTML= `${
    secondsToMinutesSeconds(currentsong.currentTime)
  }:/${secondsToMinutesSeconds(currentsong.duration)}`
  document.querySelector("#circleimg").style.left= 
  (currentsong.currentTime / currentsong.duration) * 100 + "%";
})

document.querySelector("#seekbar").addEventListener("click", e=>{
  let percent=  (e.offsetX/ e.target.getBoundingClientRect().width) * 100;
  document.querySelector("#circleimg").style.left= percent + "%";
  currentsong.currentTime= ((currentsong.duration)* percent)/100
})

currentsong.volume= 0.5;
document.querySelector(".slider").getElementsByTagName("input")[0].addEventListener("change", (e)=>{
  currentsong.volume= parseInt(e.target.value)/100;
})

Array.from(document.getElementsByClassName("english")).forEach(e=>{
  e.addEventListener("click", async item=>{
    songs= await getsongs(`songsSpotify/${item.currentTarget.dataset.folder}`)
  })
})
Array.from(document.getElementsByClassName("hinglish")).forEach(e=>{
  e.addEventListener("click", async item=>{
    songs= await getsongs(`songsSpotify/${item.currentTarget.dataset.folder}`)
  })
})
Array.from(document.getElementsByClassName("added")).forEach(e=>{
  e.addEventListener("click", async item=>{
    songs= await getsongs(`songsSpotify/${item.currentTarget.dataset.folder}`)
  })
})
Array.from(document.getElementsByClassName("added1")).forEach(e=>{
  e.addEventListener("click", async item=>{
    songs= await getsongs(`songsSpotify/${item.currentTarget.dataset.folder}`)
  })
})
Array.from(document.getElementsByClassName("added2")).forEach(e=>{
  e.addEventListener("click", async item=>{
    songs= await getsongs(`songsSpotify/${item.currentTarget.dataset.folder}`)
  })
})
Array.from(document.getElementsByClassName("japa")).forEach(e=>{
  e.addEventListener("click", async item=>{
    songs= await getsongs(`songsSpotify/${item.currentTarget.dataset.folder}`)
  })
})
Array.from(document.getElementsByClassName("hindi")).forEach(e=>{
  e.addEventListener("click", async item=>{
    songs= await getsongs(`songsSpotify/${item.currentTarget.dataset.folder}`)
  })
})


return songs;
}

main();