import './ui.css';
import './normal.css';
import { useState, useContext } from 'react';
// import ChatHistory from './ChatHistory';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from "../Context/Authcontext";

function GPTUI(){
    const { token} = useContext(AuthContext);
    const [input, setInput] = useState("");
    const navigate = useNavigate();
    const [chatlog,setChatLog]=useState([{
      user:"gpt",
      message:"How can I help you today?"
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

    const handleSubmit = async (e) => {
        e.preventDefault();
         const response = await fetch('http://127.0.0.1:5000/runModel?question='+input);
          const data = await response.text();

          console.log(token);
          //For storing chat history along with profile
          const chResponse = await fetch('http://localhost:4000/api/v1/newChat', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization':`Bearer ${token}`
            },
            body: JSON.stringify({ input, data })
            
          });
          const response_data= await chResponse.json();
          console.log(response_data);

          setChatLog([
          ...chatlog,
          { user: "me", message: input },
           { user: "gpt", message: data },
        ]);
      
        setInput("");//clear input after submitting query
        }
       
        
        function clearchat(){
          setChatLog([{
            user:"gpt",
            message:"How can I help you today?"
          },{
            user:"me",
            message:"I want to use chatGpt today"
          }]);
      }
   
        return(
              <div className="App"> 
                 <aside className="sidemenu">
                <div className="side-menu-button" onClick={clearchat}>
                <span>+</span>
                New Chat
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
                      {/* Answer:: {answer} */}
                      {/* <button type ='submit'>Submit</button> */}
                      
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
              );
              }

export default GPTUI;
