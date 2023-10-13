
/////////////////////////////////
Product_List.forEach(item => {
    create_mobileCard(item);
    create_desktopCard(item) 
})

function create_mobileCard(product) {
    let card = document.createElement('div')
    card.className = 'md-card';
    card.setAttribute('category', product.tag)
    card.setAttribute('onclick', 'open_MobileProductCard(this)')

    let price = product.price
    let fristPrice = "";
    let offvalue = "";
    let bodyStyle = "";
    if (product.off != 0) {
        price = product.off
        let darsad = Math.round((product.off * 100) / product.price) ;
        card.setAttribute('offer', true)
        bodyStyle = "md-cb-off-style"
        fristPrice = ` 
            <div class="card-offer-value md-offer-pos">
                ${product.price}
            </div>
        `
        offvalue = `
            <div class="md-card-offer">
                ${100 - darsad} %
            </div>  
        `
    }

    
    card.innerHTML = `
        <div class="card-container">
            <div class="md-card-img">
                <img src="${product.image}" alt="" width="100%">
            </div>
            <div class="md-card-content">

                <div class="md-card-title">
                    ${product.name}
                </div>
                <div class="md-card-body ${bodyStyle}">
                    <div>
                        ${product.size}
                
                    </div>
                    <div>
                
                        ${product.color}    
                    </div>
                </div>
                ${fristPrice}

                <div class="md-card-cost">
                    <span>${price}</span>
                    ریال                   
                </div>
                
            </div>
            ${offvalue}
        </div>
    ` ;

    let parent = document.getElementById('mdProductsCard').children[0];
    parent.appendChild(card)
}

function create_desktopCard(product) {
    const column = document.createElement('div')
    column.className = 'col';
    column.setAttribute('category', product.tag)
    const card = document.createElement('div')
    card.className = 'lg-card';
    const container = document.createElement('div')
    container.className = 'lg-container';
    
    let price = product.price
    let rebate_part = '';
    
    if(product.off != 0){
        column.setAttribute('offer', true)
        price = product.off;
        let darsad = Math.round((product.off * 100) / product.price) ;
        rebate_part = `
        <div id="offValue" class="lg-card-offer">
            ${100 - darsad} %
        </div>
        <div id="offCost" class="card-offer-value lg-offer-pos">
            ${product.price}
        </div>
        `
    }

    const card_body = `
        <div class="lg-card-img">
            <img src=${product.image} alt="" width="100%" height="100%">

        </div>
        <div class="lg-card-title">
            ${product.name}
        </div>
        <div class="lg-card-body">
            <div>
                ${product.size}
            </div>
            <div>
                ${product.color}
            </div>
        </div>
        <div class="lg-card-price">
            <span>${price}</span>
            ریال
        </div>
            ${rebate_part}
        
    `

    container.innerHTML = card_body ;
    card.appendChild(container)
    column.appendChild(card)
    document.querySelector('#lgProductCards .row').appendChild(column)
    
}

/////////////////////////////////

function navigationClick(label){
    const footer = document.getElementById('footer')
    const filter_navbar = document.getElementById('filterNavbar');
    const navbar_buttons = document.querySelectorAll('.lg-navbar li')
    let src , id , linke ;
    

    const activeButton = () =>{
        for(let i of navbar_buttons){
            if(i.getAttribute('label') == label){
                i.classList.add('active')
            }else{
                i.classList.remove('active')
            }
        }
    }

    const open_QRcod_card = (n , QRsourc , QRid , linke)=>{
        const content = document.getElementById('lg-QRcode-preview')
        const card = document.querySelector('#lg-QRcode-preview .qr-card')
        const QRcode = document.querySelector('#lg-QRcode-preview img') 
        const id = document.querySelector('#lg-QRcode-preview .qr-id a') 
        
        let y = navbar_buttons[n].getBoundingClientRect().y
        let x = navbar_buttons[n].getBoundingClientRect().x
        
        content.style.display = 'inline' ;
        card.style.top = y + 38 - 175  + 'px' ;
        card.style.left = x - 50 + 'px' ;
        card.style.animation = '.5s QRcode-open-animate both' ;

        QRcode.src = QRsourc ;
        id.innerHTML = QRid ;
        id.setAttribute('href', linke)
    }

    switch(label){
        
        case 'mobile-footer':
            footer.scrollIntoView({ 
                block: 'start', 
                behavior: 'smooth', 
                inline: 'start' 
            });
            
        break

        case 'products' :
            activeButton();
            window.scrollTo({
                top: filter_navbar.offsetTop - 100,
                behavior: 'smooth'
            });
        break

        case 'telegram' :
            activeButton();
            src = 'static/images/Tel-QRcode.png';
            id = '@SMODAGALLERY' ;
            linke = 'http://t.me/SMODAGALLERY' ;
            open_QRcod_card(1, src, id, linke);
            
        break
            
        case 'instagram' :
            activeButton();
            src = 'static/images/insta-QRcode.png';
            id = '@SMODAGALLERY' ;
            linke = 'http://instagram.com/SMODAGALLERY' ;
            open_QRcod_card(2, src, id, linke);
        break
                
        case 'aboutus' :
            activeButton();
            footer.scrollIntoView({ 
                block: 'start', 
                behavior: 'smooth', 
                inline: 'start' 
            });
        break
    }
   
}

function close_card(event ,element){
    let card = element.children[0] ;
    let value = {
        x : card.offsetLeft - 20 ,
        y : card.offsetTop - 20 ,
        width : card.getBoundingClientRect().width ,
        hieght : card.getBoundingClientRect().hieght
    }

    if (event.clientX < value.x
        || event.clientY < value.y
        || event.clientX > (value.x + value.width)
        || event.clientY > (value.y + value.hieght)
    ) {
        element.style.display = 'none';
        card.classList.remove('showup')
    }
}
/////////////////////////
function openProfileCard() {
    let container = document.getElementById('profile')
    let card = document.getElementById('ProfileCard')

    container.style.display = 'inline';
    card.classList.add('showup')
}

/*
function closeProfileCard(event) {
    let container = document.getElementById('profile')
    let card = document.getElementById('ProfileCard')
    let x = card.offsetLeft - 20;
    let y = card.offsetTop - 20;

    if (event.clientX < x
        || event.clientY < y
        || event.clientX > (x + 240)
        || event.clientY > (y + 340)
    ) {

        container.style.display = 'none';
        card.classList.remove('showup')

    }

}
*/
////////////////////////////////
/*   This part is for " See More " button for products in mobile mode 
const section = document.getElementById('mdProductsCard')

if (section.children[0].childElementCount <= 6) {
    section.children[1].style.display = 'none';
} else {
    section.children[1].style.display = 'inline';
    section.style.height = '130vh';
}

function openProductView(btn) {

    section.style.height = '100%';
    section.style.overflowY = 'auto';
    section.style.paddingBottom = '90px';

    btn.textContent = 'Hide';
    btn.setAttribute('onclick', "closeProductView(this)")
}
function closeProductView(btn) {
    let section = document.getElementById('mdProductsCard')


    section.style.height = '130vh';
    section.style.overflowY = 'hidden';
    section.style.paddingBottom = '0';

    btn.textContent = 'See More';
    btn.setAttribute('onclick', "openProductView(this)")
}
*/
//////////////////////////////

function setFilter(elem) {
    let value = elem.getAttribute('value')
    const filterbutton = document.querySelectorAll('#filterNavbar .filter-item')
    let elements; 

    if(window.screen.width < 575){
        elements = document.querySelectorAll('#mdProductsCard .md-card') 
    }else{
        elements = document.querySelectorAll('#lgProductCards .col')
    }

    filterbutton.forEach(btn =>{
        if(btn.getAttribute('value') == value ){
            if(btn.classList.contains('active-filter')){
                btn.classList.remove('active-filter')     
                value = "All" ;
            }else{
                btn.classList.add('active-filter')
            }       
        }else{
            btn.classList.remove('active-filter')
        }
    })
    
    elements.forEach(card =>{
        const category = card.getAttribute('category')
        switch(value){
            case 'All':
                card.classList.remove('hide') 
            break

            case 'rebate':
                card.classList.add('hide')
                if(card.getAttribute('offer')){
                    card.classList.remove('hide')
                }
            break
            
            default:
                if(category != value ){        
                    card.classList.add('hide')
                }else{
                    card.classList.remove('hide')       
                }
            break
        }
    });
}  

/////////////////////////

function open_MobileProductCard(card) {
    const container = document.getElementById('md-card-preview')
    let y = card.getBoundingClientRect().y
    let card_copy = card.cloneNode(true)
    card_copy.className = 'card-active actineCard-position' ;
    card_copy.style.top = y + 'px' ;
    container.appendChild(card_copy)
    container.style.display = 'flex' ;

}

function close_MobileProductCard(container) {
    container.style.display = 'none' ;
    container.innerHTML = '' ;
}

/*
 window.addEventListener('hashchange',(e)=>{
        if(e.oldURL.length > e.newURL.length){
            alert('Back')
        }
    })
*/
