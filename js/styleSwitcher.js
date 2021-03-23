window.addEventListener('DOMContentLoaded',function(){
     
    let color=JSON.parse(localStorage.getItem('color'))
    generateColor(color)
})

const links=document.querySelectorAll('.alternate-style')


function selectStyle(color){
    
    localStorage.setItem('color',JSON.stringify(color))
    generateColor(color)
}

function generateColor(color){

    for(let i=0;i<links.length;i++){
        let link=links[i]
        if(color===link.title){ 
            link.removeAttribute('disabled')
        }else{
            if(!link.hasAttribute('disabled')){
                link.setAttribute('disabled',true)
            }
        }
    }
       

}
 
const btnSwitcher=document.querySelector('.toggle-style-switcher')

btnSwitcher.addEventListener('click',function(e){
    if(e.target.closest('.toggle-style-switcher')){
        document.querySelector('.style-switcher').classList.toggle('toggler')
    }
})