import { useState, useRef } from "react";
import "./styles.css";
const OPT_COUNT = 5;
export default function App() {
  const [otp, setOtp] = useState(new Array(OPT_COUNT).fill(""));
  const inputRefArr = useRef([]);
  const handleOnchange = (value, index) => {
    console.log(value);

    if (isNaN(value)) return;
    const sanitizedValue = value.trim();
    const newOtp = [...otp];
    newOtp[index] = sanitizedValue.slice(-1);
    setOtp(newOtp);
    sanitizedValue && inputRefArr.current[index + 1]?.focus();
  };

  const handleKeyDown = (e, index) => {
    if (!e.target.value && e.key === "Backspace") {
      inputRefArr.current[index - 1]?.focus();
    }
  };
  return (
    <div className="App">
      <h1>OTP validation </h1>
      <div>we have sent an otp to your registered email.</div>
      {otp.map((item, index) => {
        console.log("test", otp[index]);

        return (
          <input
            className="otp-input"
            key={index}
            type="text"
            ref={(item) => (inputRefArr.current[index] = item)}
            value={otp[index]}
            onKeyDown={(e) => handleKeyDown(e, index)}
            onChange={(e) => handleOnchange(e.target.value, index)}
          />
        );
      })}
    </div>
  );
}
