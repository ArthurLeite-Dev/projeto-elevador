(function() {
    const linesElements = document.querySelectorAll('[lines]');
    linesElements.forEach(ele => {
        const quant = +ele.getAttribute('lines');
        for(let i = 0; i < quant; i++) {
            const line = document.createElement('div');
            line.classList.add('lines');
            ele.appendChild(line);
        }
    }); 
})();
