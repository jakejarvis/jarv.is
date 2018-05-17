function loadPrompt() {
    var code = prompt("Please enter your five-character code.", "");
    
    if(code != null) {
        window.location = 'index.php?pass=' + code;
    }
}