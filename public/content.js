// Inform the background page that 
// this tab should have a page-action.
chrome.runtime.sendMessage({
    from: 'content',
    subject: 'showPageAction',
    value: null
});

async function loadSVG(url){
    return (await fetch(url)).text()
}

async function process(){
    let unprocessed = document.getElementsByClassName('aciTreeInode');

    let processed = new Map()

    processed.set('root', {name: 'root', icon: '', children: [], cachedSVGs: {}})
    unprocessed[0].setAttribute('tree_name', 'root')

    for(let j = 1 ; j< unprocessed.length; j++){
            let name = unprocessed[j].getElementsByClassName('aciTreeText')[0].innerText;
            let display = unprocessed[j].style.display;

            // ----------- SVGs ------------

            let icon = 0;
            let x = getComputedStyle(
                unprocessed[j].getElementsByClassName('aciTreeIcon')[0]
                ).backgroundImage;
            let y = x.substring(5, x.length-2);
            let iconSVG = await loadSVG(y)

            // check whatever its alreaddy in list but with diff set of classes
            let find = Object.values(processed.get('root').cachedSVGs).find(r => r.svg == iconSVG)
            if(find){
                icon = find.id
            } else {
                processed.get('root').cachedSVGs['svg'+j] = {id: j, svg: iconSVG}
                icon = j
            }

            unprocessed[j].setAttribute('tree_name', 'tree_name'+j)

            let parent = ((el) => {
                let p = el.parentElement;
                while(!p.classList.contains('aciTreeInode')){
                    p = p.parentElement
                }
                return p.getAttribute('tree_name') ? p.getAttribute('tree_name') : 'root'
            })(unprocessed[j])
            
            processed.set('tree_name'+j, {name: name, display: display, icon: icon, children: [], id: 'tree_name' + j})
            processed.get(parent).children.push(processed.get('tree_name'+j))
    }

    processed.get('root').cachedSVGs = Object.values(processed.get('root').cachedSVGs)
    processed.get('root').cachedSVGs.forEach(e => {e.svg = btoa(e.svg)})
    return processed.get('root');
}

function toggle(list){
    let unprocessed = document.getElementsByClassName('aciTreeInode');
    [...unprocessed].forEach(el => {el.style.display = 'block'});
    [...unprocessed].forEach(el => {if(list.includes(el.getAttribute('tree_name'))) el.setAttribute('style', 'display: none !important')})
}

// Listen for messages from the popup.
chrome.runtime.onMessage.addListener(async (msg, sender, response) => {
    if ((msg.from === 'popup') && (msg.subject === 'DOMInfo')) {
        let result = await process()
        chrome.runtime.sendMessage({
            data: result 
        }, null);
    }
    if ((msg.from === 'popup') && (msg.subject === 'toggle')) {
        toggle(msg.value);
    }
});