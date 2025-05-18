# Browser-Sync-Play

It's my another useless project.
I made this as a way to play videos on sync if you are watching it on chrome or some other browser.

It's just a server if you want the clients to be connected. You have to do floowing steps:
1. Open the video url in your favourite browser. For this example we are taking https://videos.pexels.com/video-files/4114797/4114797-uhd_2560_1440_25fps.mp4
2. Press F12 or ctrl+shift+c to open developer tool.
3. Go to `Console` Tab
4. Paste this code there
   ```
   const mode = "admin";
   var inputField = document.createElement("input");
   inputField.type = "text";
   inputField.placeholder = "Enter the host IP Address";
  
   var submitButton = document.createElement("button");
   submitButton.textContent = "Submit";
  
   var form = document.createElement("div");
   form.style.setProperty("z-index", "3");
   form.style.position = "absolute";
   form.appendChild(inputField);
   form.appendChild(submitButton);
  
   document.body.appendChild(form);
   var ipaddr = "";
  
   submitButton.addEventListener("click", function() {
    ipaddr = inputField.value;
    form.remove();
      const ws = new WebSocket(`ws://${ipaddr}:8090`);
   ws.onopen = () => {
      console.log('Connected to server');
      setInterval(sendMessage,3000);
   };
   var video = document.getElementsByName("media")[0];
   ws.onmessage = (event) => {
      if(event.data==-1){
          video.pause();
      }else{
          if(video.paused){
              video.play();
          }
          video.currentTime = event.data;
      }
      
   };
  
   function sendMessage() {
      if(video.currentTime <= video.duration){
          if(video.paused){
          ws.send(-1);
      }
      else{
          if(mode=="admin"){
          ws.send(video.currentTime);
      }
      }
      }
   }
   });
   ```
If you pasting it first time, it will not allow you. Type `allow pasting` and press enter. Then you paste this code.
*** Caution: If you are the admin to play the video leave the mode(line 1) as it is. But if you are client change the mode to something else suppose "client". ***
5. After pressing `Enter` it will ask for the server ip address. Enter the ip address and press sumbit.
6. After doing it on all the clients. Enjoy watching the video as sync.
