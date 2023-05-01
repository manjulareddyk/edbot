// import logo from './logo.svg';
import './ui.css';
import './normal.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function GPTUI() {

  //add state for input and chatlog
  const [input,setInput]=useState("");
   const navigate = useNavigate();
  const [chatlog,setChatLog]=useState([{
    user:"gpt",
    message:"How can I help ou today?"
  },{
    user:"me",
    message:"I want to use chatGpt today"
  }]);

 

  const handleButtonClicked = ()=> {
   

    // close the window
    window.close();
  
    // navigate to a different URL
    navigate('/Login');
  }
  
    function clearchat(){
      setChatLog([]);
    }

    function onclick(){
      setChatLog([]);
    }

  async function handleSubmit(e){
    e.preventDefault();
    setChatLog([...chatlog,{ user: "me", message:`${input}`}])
    setInput("");
  }

  return (
    <div className="App">
      <aside className="sidemenu">
        <div className="side-menu-button" onClick={clearchat}>
          <span>+</span>
          New Chat
        </div>
     <br></br>   <br></br>   <br></br>   <br></br>   <br></br>   <br></br>   <br></br>   <br></br>   <br></br>   <br></br>   <br></br>   <br></br>   <br></br>   <br></br>   <br></br>   <br></br>   <br></br>   <br></br>   <br></br>   <br></br>   <br></br>   <br></br>   <br></br>   <br></br>   <br></br>   <br></br>

        <div className='border'>
        <div class="flex-col flex-1 overflow-y-auto border-b border-white/20"><div class="flex flex-col gap-2 pb-2 text-gray-100 text-sm"></div></div>
        <div className="button" onClick={onclick}>
        <span><svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
        </span> Upgrade to Plus
        <span class="rounded-md bg-yellow-200 py-0.5 px-1.5 text-xs font-medium uppercase text-gray-800">NEW</span>
        </div>

        <div className="button" onClick={onclick}>
          <a class="flex py-3 px-3 items-center gap-3 rounded-md hover:bg-gray-500/10 transition-colors duration-200 text-white cursor-pointer text-sm"><svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
            Settings</a>
        </div>

      <div className="button" onClick={onclick}>
        <a  target="_blank" class="flex py-3 px-3 items-center gap-3 rounded-md hover:bg-gray-500/10 transition-colors duration-200 text-white cursor-pointer text-sm"><svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
          Get help </a>
      </div>   

      <div className="button" onClick={handleButtonClicked}>
      <a class="flex py-3 px-3 items-center gap-3 rounded-md hover:bg-gray-500/10 transition-colors duration-200 text-white cursor-pointer text-sm"><svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
      Log out</a>
      </div>
      </div>
      
      </aside>
      <section className="chatbox">
          <div className="chat-log">
            {chatlog.map((message,index) =>(
                <ChatMessage key={index} message={message}/>
            ))}
          </div>
          <div className="chat-input-holder">
            <form onSubmit={handleSubmit}>
              <input
                rows="1"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="chat-input-textarea" >
              </input>
            </form>
          </div>
      </section>
    </div>
    
  );
}
const ChatMessage = ({ message }) => {
  return(
    <div className={'chat-message ${message.user === "gpt" && "chatgpt"}' }>
        <div className="chat-message-center">
          <div className={'avatar ${message.user === "gpt" && "chatgpt"}' }>           
          </div>
          <div className="message">
            {message.message}
          </div>
        </div>
    </div>
  )
 } 
 export default GPTUI;

