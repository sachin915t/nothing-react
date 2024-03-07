import React from "react";
import { useState, useEffect, useRef, useCallback } from "react";
import { RiLockPasswordLine } from "react-icons/ri";

const App = () => {
  const [length, setLength] = useState(8);
  const [digits, setDigits] = useState(false);
  const [symbols, setSymbols] = useState(false);
  const [password, setPassword] = useState("")

  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(()=>{
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(digits) str+="0123456789";
    if(symbols) str+="!@#$%^&*()";

    for(let i = 1; i <= length; i++){
      let char = Math.floor(Math.random() * str.length + 1);

      pass+=str.charAt(char);

    }
    setPassword(pass);
  },[length, digits, symbols, setPassword]);

  useEffect(()=>{
    passwordGenerator()
  },[length,digits,symbols,passwordGenerator])

  const copyClip = useCallback(()=>{
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0,6);
    window.navigator.clipboard.writeText(password);
  },[password])




  return (
    <>
      <div className="w-screen h-screen bg-slate-700 flex justify-center items-center">
        <div className="w-6/12 md:w-2/3 sm:w-full pb-6  bg-slate-50 rounded-md shadow-md">
          <div className="bg-slate-300 rounded-t-md">
            <h1 className="text-center text-3xl font-bold pt-4 pb-4">
              Password Generator
            </h1>
          </div>
          {/* main-box */}
          <div className=" flex justify-center items-center gap-3 flex-col pt-2">
            <div className="flex justify-center">
              <RiLockPasswordLine className="text-9xl " />
            </div>
            <div className="main flex flex-col gap-2 justify-center items-center">
              <input
                type="text"
                value={password}
                className="bg-slate-400 rounded-md p-3 text-xl outline-none w-full"
                placeholder="password"
                readOnly
                ref={passwordRef}
              />
              <button className="bg-slate-400 px-3 py-2 rounded-md font-semibold hover:bg-slate-300 transition 0.3s"
              onClick={copyClip}
              
              >

                Copy
              </button>

              <input
                type="range"
                min={6}
                max={105}
                value={length}
                className="cursor-pointer w-full h-1 mt-2 mb-6 bg-gray-200 rounded-lg appearance-none  range-sm dark:bg-gray-700"
                onChange={(e)=>{
                  setLength(e.target.value);
                }}
              />
              <label className="font-bold text-3xl">Length:{length}</label>
                  
              

              <div className="flex gap-2 items-center mb-4">
                <input type="checkbox" 
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  defaultChecked={digits}
                  id="digitInput"
                  onChange={()=>{
                    setDigits((prev)=>!prev)
                  }}
                />
                <label htmlFor="digitInput">Digits</label>
              </div>
              <div className="flex items-center mb-4 gap-2">
                <input type="checkbox" 
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  defaultChecked={symbols}
                  id="symbolInput"
                  onChange={()=>{
                    setSymbols((prev)=>!prev)
                  }}
                />
                <label  htmlFor="symbolInput">Symbols</label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
