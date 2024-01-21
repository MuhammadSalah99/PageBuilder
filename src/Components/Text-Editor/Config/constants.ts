export const myStyles = `
.tippy-box {
  background-color: #2b1313;
  display: flex;
  justify-content: space-between;
  border-radius: 4px;
  width: 20rem;
}

.bubble-menu {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
}

/* Responsive Styles */
@media screen and (max-width: 600px) {
  .tippy-box {
    width: 100%;
    
  }

  .bubble-menu {

  }
}
.tool-bar-button{
  display:flex;
  flex-direction:column;
  justify-content:center;
  align-items:center;
  padding-left:0.25rem;
  padding-right:0.25rem;
  padding-top:0.325rem;
  padding-bottom:0.325rem;
  background-color:transparent;
  outline:none;
  border:none;
  cursor:pointer;
  transition:background-color 1s ease-in-out;
}
.tool-bar-button.active{
  background-color:#432727;
}

.tool-bar-button:hover{
  background-color:#432727;
}

.justify-select-toolbar{
  cursor:pointer;
  background-color: #2b1313;
  border:none;
  ooutline:none;
  width:3rem;
  height:auto;
  color:white;
}
.opt{
  color:white;
}
.color-toolbar{
  background-color:transparent;
  border:none;
  outline:none;

}

.tiptap > *{
  margin:0;
  padding:0;
}

`;