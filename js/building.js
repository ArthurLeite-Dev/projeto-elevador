(function () {

// --Floors--

function createGroundFloor(){
    const window = document.createElement('div')
    window.classList.add('window')

    const ground = document.createElement('div')
    ground.classList.add('ground')
    ground.setAttribute('FloorNumber','Ground Floor')
    ground.appendChild(window)

    return ground
}

function createFloor(floorNumber){
    const door = document.createElement('div')
    door.classList.add('door')

    const floor = document.createElement('div')
    floor.classList.add('floor')
    floor.setAttribute('FloorNumber', floorNumber)
    floor.appendChild(door)

    return floor
}

function createAllFloors(){
    const elementsWithFloors = document.querySelectorAll('[floors]')
        
    elementsWithFloors.forEach(el => {
        const quantity = +el.getAttribute('floors')
            
        for (let i = quantity; i > 0; i--) {
        el.appendChild(createFloor(i))
        }

        el.appendChild(createGroundFloor())
    })
}

    
    createAllFloors()

// --Elevator--

    function getElevatorSize() {
        const groundHeight = document.querySelector('[FloorNumber="Ground Floor"]');
        return groundHeight.offsetHeight;
    }

    function createElevator() {
        const hoistWay = document.querySelector('.hoistWay');
        const elevator = document.createElement('div');
        elevator.classList.add('elevator');
        elevator.style.height = getElevatorSize() + 'px';
        elevator.style.bottom = '0'; 
        hoistWay.appendChild(elevator);

    }

function updateDisplay(floorNumber) {
    const display = document.querySelector('.display');
    
    if (floorNumber === 0) {
        display.textContent = 'Ground Floor';
        return;
    }

    const lastDigit = floorNumber % 10;
    const lastTwoDigits = floorNumber % 100;

    if (lastTwoDigits >= 11 && lastTwoDigits <= 13) {
        display.textContent = `${floorNumber}th Floor`;
        return;
    }

    switch (lastDigit) {
        case 1:
            display.textContent = `${floorNumber}st Floor`;
            break;
        case 2:
            display.textContent = `${floorNumber}nd Floor`;
            break;
        case 3:
            display.textContent = `${floorNumber}rd Floor`;
            break;
        default:
            display.textContent = `${floorNumber}th Floor`;
    }
}

    function moveElevatorToFloor(floorNumber, callback) {
    const elevator = document.querySelector('.elevator');
    const floorHeight = getElevatorSize();
    const targetFloor = floorNumber === 'Ground Floor' ? 0 : +floorNumber;

    const currentBottom = parseFloat(getComputedStyle(elevator).bottom) || 0;
    const targetBottom = targetFloor * floorHeight;

    const display = document.querySelector('.display');

    const direction = targetBottom > currentBottom ? 'Going up...' :
    targetBottom < currentBottom ? 'Going down...' : null;

    if (direction) display.textContent = direction;
    elevator.style.bottom = targetBottom + 'px';

    setTimeout(() => {
        updateDisplay(targetFloor);
        if (typeof callback === 'function') callback();
    }, 1500);
}


//--Buttons--

    function controlElevatorFromPanel() {
        const buttons = document.querySelectorAll('[destination]');
        buttons.forEach(button => {
        const destination = button.getAttribute('destination');
        button.addEventListener('click', () => {

            buttons.forEach(btn => {
                btn.style.backgroundColor = '';
                btn.style.border = '';
            });

            button.style.backgroundColor = '#ffcccb';
            button.style.border = '3px solid red';

            moveElevatorToFloor(destination, () => {
 
                button.style.backgroundColor = '';
                button.style.border = '';
            });
        });
    });
}



    createElevator();
    controlElevatorFromPanel();

})()
