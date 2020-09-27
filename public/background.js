chrome.runtime.onMessage.addListener((msg, sender) => {
  // First, validate the message's structure.
  if ((msg.from === 'content') && (msg.subject === 'showPageAction')) {
    // Enable the page-action for the requesting tab.
    chrome.pageAction.show(sender.tab.id);
  }
});
/*
Image.prototype.coreOnload = Image.prototype.onload;
Image.prototype.onload = function() {
   console.log('Image Loaded ' + this.src);
   if( this.coreOnload ) {
      this.coreOnload();
    }
};*/