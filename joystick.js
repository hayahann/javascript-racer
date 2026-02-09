const joyStickHandle = document.querySelector(".joystick-handle");
const joyStickContainer = document.querySelector(".joystick");

joyStickContainer.addEventListener("pointerdown", handleJoystickStart);

function handleJoystickStart(event) {
    console.log("PRESSED")
    
    document.addEventListener("pointermove", handleJoystickMove);
    document.addEventListener("pointerup", handleJoystickEnd);
  }
  
  
  function handleJoystickEnd() {
    document.removeEventListener("pointermove", handleJoystickMove);
    document.removeEventListener("pointerup", handleJoystickEnd);
  }

  function calculateAngle(centerX, centerY, pointX, pointY) {
    const deltaX = pointX - centerX;
    const deltaY = pointY - centerY;
    const angleInRadians = Math.atan2(deltaY, deltaX);
    let angleInDegrees = (angleInRadians * 180) / Math.PI + 90;
      if (angleInDegrees < 0) angleInDegrees += 360;
    return angleInDegrees;
  }

  function calculateCircleAngleAndDistance(clientX, clientY) {
    const { x, y, width, height } = joyStickContainer.getBoundingClientRect();
  
    let distance = Math.sqrt(
      Math.pow(clientX - (x + width / 2), 2) +
        Math.pow(clientY - (y + height / 2), 2)
    );
  
    distance = clamp(distance, 0, height / 2);
  
    return {
      angle: calculateAngle(x + width / 2, y + height / 2, clientX, clientY),
      distance,
    };
  }

  function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
  }

  function handleJoystickMove(event) {
    const { angle, distance } = calculateCircleAngleAndDistance(
        event.clientX,
        event.clientY 
    );
  
    joyStickHandle.style.transform = `translateY(${-distance}px)`;
    joyStickHandle.parentElement.style.transform = `rotate(${angle}deg)`;

    rad = angle * (Math.PI / 180);
    Horizontal = distance * Math.cos(rad);
    Vertical = distance * Math.sin(rad);

    console.log(Horizontal, Vertical);
    
  }


  function handleJoystickStart(event) {
    handleJoystickMove(event);
    document.addEventListener("pointermove", handleJoystickMove);
    document.addEventListener("pointerup", handleJoystickEnd);
  }


  function handleJoystickEnd() {
    joyStickHandle.style.transform = "";
    joyStickHandle.parentElement.style.transform = "";
    document.removeEventListener("pointermove", handleJoystickMove);
    document.removeEventListener("pointerup", handleJoystickEnd);
  }

