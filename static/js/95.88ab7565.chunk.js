"use strict";(self.webpackChunkmy_react_app=self.webpackChunkmy_react_app||[]).push([[95],{3095:function(t,e,r){r.r(e),r.d(e,{default:function(){return B}});var s=r(1413),n=r(5671),o=r(3144),i=r(136),a=r(516),u=r(2791),c=r(885),l="ProfileInfo_descriptionBlock__XBXuJ",d="ProfileInfo_mainPhoto__QU8TO",f="ProfileInfo_contact__sQB8W",h=r(354),p=r(4353),x=r(184),j=function(t){var e=(0,u.useState)(!1),r=(0,c.Z)(e,2),s=r[0],n=r[1],o=(0,u.useState)(t.status),i=(0,c.Z)(o,2),a=i[0],l=i[1];(0,u.useEffect)((function(){l(t.status)}),[t.status]);return(0,x.jsx)("div",{children:s?(0,x.jsx)("div",{children:(0,x.jsx)("input",{onChange:function(t){l(t.currentTarget.value)},autoFocus:!0,onBlur:function(){n(!1),t.updateStatus(a)},value:a||"------"})}):(0,x.jsxs)("div",{children:[(0,x.jsx)("b",{children:"Status : "}),(0,x.jsx)("span",{onDoubleClick:function(){n(!0)},children:t.status||"------"})]})})},m=r(704),v=r(7492),b=r(9234),g=r(9578),P=(0,m.Z)({form:"edit-profile"})((function(t){var e=t.handleSubmit,r=t.profile,s=t.error;return(0,x.jsxs)("form",{onSubmit:e,children:[s&&(0,x.jsx)("div",{className:b.Z.formSummaryError,children:s}),(0,x.jsxs)("div",{children:[(0,x.jsx)("b",{children:"FullName "})," :",(0,v.Gr)("Full Name","fullName",[g.C1],v.II)]}),(0,x.jsxs)("div",{children:[(0,x.jsx)("b",{children:"Looking For A Job "})," :",(0,v.Gr)("","lookingForAJob",[],v.II,{type:"checkbox"})]}),(0,x.jsxs)("div",{children:[(0,x.jsx)("b",{children:"My Professional Skills "})," :",(0,v.Gr)("My Professional Skills","lookingForAJobDescription",[],v.gx)]}),(0,x.jsxs)("div",{children:[(0,x.jsx)("b",{children:"About Me "})," :",(0,v.Gr)("About Me","aboutMe",[],v.gx)]}),(0,x.jsxs)("div",{children:[(0,x.jsx)("b",{children:"Contacts"})," : ",Object.keys(r.contacts).map((function(t){return(0,x.jsx)("div",{className:f,children:(0,x.jsxs)("b",{children:[t," : ",(0,v.Gr)(t,"contacts."+t,[g.b3],v.II)]})},t)}))]}),(0,x.jsx)("div",{children:(0,x.jsx)("button",{children:"Update"})})]})})),_=function(t){var e=t.profile,r=t.isOwner,s=t.goToEditMode;return(0,x.jsxs)("div",{children:[r&&(0,x.jsx)("div",{children:(0,x.jsx)("button",{onClick:s,children:"Edit"})}),(0,x.jsxs)("div",{children:[(0,x.jsx)("b",{children:"FullName"})," : ",e.fullName]}),(0,x.jsxs)("div",{children:[(0,x.jsx)("b",{children:"Looking For A Job"})," : ",e.lookingForAJob?"Yes":"No"]}),(0,x.jsxs)("div",{children:[(0,x.jsx)("b",{children:"My Professional Skills"})," : ",e.lookingForAJobDescription?e.lookingForAJobDescription:""]}),(0,x.jsxs)("div",{children:[(0,x.jsx)("b",{children:"About Me"})," : ",e.aboutMe?e.aboutMe:""]}),(0,x.jsxs)("div",{children:[(0,x.jsx)("b",{children:"Contacts"})," : ",Object.keys(e.contacts).map((function(t){return(0,x.jsx)(k,{contactTitle:t,contactValue:e.contacts[t]},t)}))]})]})},k=function(t){var e=t.contactTitle,r=t.contactValue;return(0,x.jsxs)("div",{className:f,children:[(0,x.jsx)("b",{children:e})," : ",r]})},S=function(t){var e=t.isOwner,r=t.profile,s=t.status,n=t.updateStatus,o=t.savePhoto,i=t.saveProfile,a=(0,u.useState)(!1),f=(0,c.Z)(a,2),m=f[0],v=f[1];if(!r)return(0,x.jsx)(h.Z,{});return(0,x.jsx)("div",{children:(0,x.jsxs)("div",{className:l,children:[(0,x.jsx)("img",{alt:"avatar",src:r.photos&&r.photos.large||p,className:d,accept:"image/*"}),e&&(0,x.jsx)("input",{type:"file",onChange:function(t){t.target.files.length&&o(t.target.files[0])}}),(0,x.jsx)(j,{status:s,updateStatus:n}),m?(0,x.jsx)(P,{initialValues:r,profile:r,onSubmit:function(t){i(t).then((function(){v(!1)}))}}):(0,x.jsx)(_,{profile:r,isOwner:e,goToEditMode:function(){v(!0)}})]})})},I=r(1652),y=r(2982),Z="MyPosts_posts__GSiZ2",C="MyPosts_postsBlock__lB-pf",M="Post_item__Yu4oG",N=function(t){return(0,x.jsxs)("div",{className:M,children:[(0,x.jsx)("img",{alt:"user-avatar",src:"https://static.vecteezy.com/system/resources/thumbnails/002/002/403/small/man-with-beard-avatar-character-isolated-icon-free-vector.jpg"}),t.message,(0,x.jsx)("div",{children:(0,x.jsxs)("span",{children:["like ",t.likes_count]})})]})},F=r(6139),w=(0,g.DT)(10),A=(0,m.Z)({form:"profileAddNewPostForm"})((function(t){return(0,x.jsxs)("form",{onSubmit:t.handleSubmit,children:[(0,x.jsx)("div",{children:(0,x.jsx)(F.Z,{name:"newPostText",component:v.gx,placeholder:"Post Message",validate:[g.C1,w]})}),(0,x.jsx)("div",{children:(0,x.jsx)("button",{children:"Add Post"})})]})})),z=function(t){var e=(0,y.Z)(t.posts).reverse().map((function(t){return(0,x.jsx)(N,{id:t.id,message:t.message,likes_count:t.likesCount},t.id)}));return(0,x.jsxs)("div",{className:C,children:[(0,x.jsx)("h2",{children:"My Posts"}),(0,x.jsx)(A,{onSubmit:function(e){t.addPost(e.newPostText)}}),(0,x.jsx)("div",{className:Z,children:e})]})},T=r(8687),U=(0,T.$j)((function(t){return{posts:t.profilePage.posts,newPostText:t.profilePage.newPostText}}),(function(t){return{addPost:function(e){t((0,I.Pi)(e))}}}))(z),D=function(t){return(0,x.jsxs)("div",{children:[(0,x.jsx)(S,{isOwner:t.isOwner,profile:t.profile,status:t.status,updateStatus:t.updateStatus,savePhoto:t.savePhoto,saveProfile:t.saveProfile}),(0,x.jsx)(U,{})]})},E=r(7781),J=r(3522),O=r(7689),G=function(t){(0,i.Z)(r,t);var e=(0,a.Z)(r);function r(){return(0,n.Z)(this,r),e.apply(this,arguments)}return(0,o.Z)(r,[{key:"refreshProfile",value:function(){var t=this.props.router.params.userId;t||this.props.isAuth&&(t=this.props.authorizedUserId),t&&(this.props.getUserProfile(t),this.props.getStatus(t))}},{key:"componentDidMount",value:function(){this.refreshProfile()}},{key:"componentDidUpdate",value:function(t,e,r){this.props.router.params.userId!=t.router.params.userId&&this.refreshProfile()}},{key:"render",value:function(){if(!this.props.router.params.userId&&!this.props.authorizedUserId)return(0,x.jsx)(O.Fg,{to:"/login"});var t=this.props.authorizedUserId&&(!this.props.router.params.userId||this.props.router.params.userId==this.props.authorizedUserId);return(0,x.jsx)(D,(0,s.Z)((0,s.Z)({},this.props),{},{isOwner:t,profile:this.props.profile,status:this.props.status,updateStatus:this.props.updateStatus,savePhoto:this.props.savePhoto}))}}]),r}(u.Component),B=(0,E.qC)((0,T.$j)((function(t){return{profile:t.profilePage.profile,status:t.profilePage.status,isAuth:t.auth.isAuth,authorizedUserId:t.auth.userId}}),{getUserProfile:I.et,getStatus:I.lR,updateStatus:I.Nf,savePhoto:I.Ju,saveProfile:I.Ii}),J.E)(G)},7492:function(t,e,r){r.d(e,{Gr:function(){return f},II:function(){return d},gx:function(){return l}});var s=r(1413),n=r(5987),o=r(9234),i=r(6139),a=r(184),u=["input","meta"],c=function(t){return function(e){var r=e.input,i=e.meta,c=(0,n.Z)(e,u),l=i.touched&&i.error;return(0,a.jsxs)("div",{className:o.Z.formControl+" "+(l?o.Z.error:""),children:[(0,a.jsx)("div",{children:(0,a.jsx)(t,(0,s.Z)((0,s.Z)({},r),c))}),l&&(0,a.jsxs)("span",{children:[" ",i.error," "]})]})}},l=c("textarea"),d=c("input"),f=function(t,e,r,n){var o=arguments.length>4&&void 0!==arguments[4]?arguments[4]:{};return(0,a.jsx)("div",{children:(0,a.jsx)(i.Z,(0,s.Z)({placeholder:t,name:e,validate:r,component:n},o))})}},9578:function(t,e,r){r.d(e,{C1:function(){return s},DT:function(){return n},b3:function(){return i},oQ:function(){return o}});var s=function(t){if(!t)return"Field is required"},n=function(t){return function(e){if(e&&e.length>t)return"Max Length is ".concat(t," symbols")}},o=function(t){return function(e){if(e&&e.length<t)return"Min Length is ".concat(t," symbols")}},i=function(t){var e=new RegExp("^(https?:\\/\\/)?((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|((\\d{1,3}\\.){3}\\d{1,3}))(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*(\\?[;&a-z\\d%_.~+=-]*)?(\\#[-a-z\\d_]*)?$","i");if(t&&!e.test(t))return"Invalid url format"}},9234:function(t,e){e.Z={formControl:"FormsControls_formControl__NR1bV",error:"FormsControls_error__wukgD",formSummaryError:"FormsControls_formSummaryError__Rdvzq"}}}]);
//# sourceMappingURL=95.88ab7565.chunk.js.map