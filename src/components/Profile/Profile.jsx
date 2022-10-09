import React from "react";
import MyPosts from "./MyPosts/MyPosts";

const Profile = () => {
   return (
       <div>
           <div>
               <img alt='thumb' src='https://waytomonte.com/img/slider/4/1/3787/0d53860a0a252a83e0b2c6147c8d2352_thumb.jpg'/>
           </div>
           <div>
               Avatar + Desc
           </div>
           <MyPosts/>
       </div>
   );
}

export default Profile;