// Inform the background page that 
// this tab should have a page-action.
chrome.runtime.sendMessage({
    from: 'content',
    subject: 'showPageAction',
});

function process(){
    let unprocessed = document.getElementsByClassName('aciTreeInode');
    let processed = new Map()

    processed.set('root', {name: 'root', icon: '', children: []})
    unprocessed[0].setAttribute('tree_name', 'root')

    for(let j = 1 ; j< unprocessed.length; j++){
            let icon = unprocessed[j].getElementsByClassName('aciTreeIcon')[0].style.background;
            let name = unprocessed[j].getElementsByClassName('aciTreeText')[0].innerText;

            processed.set('tree_name'+j, {name: name, icon: icon, children: [], id: 'tree_name' + j})
            unprocessed[j].setAttribute('tree_name', 'tree_name'+j)

            let parent = ((el) => {
                let p = el.parentElement;
                while(!p.classList.contains('aciTreeInode')){
                    p = p.parentElement
                }
                return p.getAttribute('tree_name') ? p.getAttribute('tree_name') : 'root'
            })(unprocessed[j])
            
            processed.get(parent).children.push(processed.get('tree_name'+j))
    }

    return processed.get('root');
}

// Listen for messages from the popup.
chrome.runtime.onMessage.addListener((msg, sender, response) => {
    if ((msg.from === 'popup') && (msg.subject === 'DOMInfo')) {
        response({data : process()});
    }
});