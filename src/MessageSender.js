import React,{useState} from 'react'
import "./MessageSender.css"
import {Avatar} from "@material-ui/core"
import VideocamIcon from '@material-ui/icons/Videocam';
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import {useStateValue} from "./StateProvider"
import db from './firebase'
import firebase from "firebase"

function MessageSender() {
    const [{user}, dispatch] = useStateValue(''); 
    const [input,setInput] = useState('');
    const[imageUrl,setImageUrl] = useState('');
    const handleSubmit =(e)=>{
        e.preventDefault();

        db.collection("posts").add({
        
            
            message:input,
            timestamp:firebase.firestore.FieldValue.serverTimeStamp(),
            profilePic:"https://images.daznservices.com/di/library/GOAL/75/2e/messi-barcelona-2020_117c1wds82p0w1uf4315ztj7n6.jpg?t=1575882947&quality=100",
            username:"stephen",
            image:imageUrl,
            
        })
        
        setInput('');
        setImageUrl(''); 
    }
    return (
        <div className="messageSender">
            <div className="messageSender_top">
                <Avatar  src={user.photoURL}/>
                <form>
                    <input
                        value={input}
                        onChange={(e)=>setInput(e.target.value)}
                        className="messageSender_input"
                         placeholder={`what's on your mind ,${user.displayName}?`}
                        type="text"/>
                    <input
                        value={imageUrl}
                        onChange={(e) =>setImageUrl(e.target.value)}
                        className='messageSender_input'
                        placeholder="image URL (optional)"
                        type="text"/>
                    <button onClick={handleSubmit} type="submit">
                        Hidden Submit
                      </button>  

                </form>

            </div>
            <div className="messageSender_bottom">
                <div className="messageSender_option">
                    <VideocamIcon style={{ color:"red"}}/>
                    <h3> Live Video</h3>
                </div>
                <div className="messageSender_option">
                    < PhotoLibraryIcon style={{ color:"green"}}/>
                    <h3> Photo/Video</h3>
                </div>
                <div className="messageSender_option">
                    <InsertEmoticonIcon  style={{ color:"orange"}}/>
                    <h3>Feeling/activity</h3>
                </div>
            </div>
        </div>
    )
}

export default MessageSender
