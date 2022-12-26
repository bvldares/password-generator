import React, {useState} from "react";
import copyIcon from "../assets/images/icon-copy.svg"
import arrow from "../assets/images/icon-arrow-right.svg"
export default function Generator(){

    //STATES
    const [output, setOutput] = useState("")
    const [length, setLength] = useState(12)
    const [uppercase, setUppercase] = useState(false)
    const [lowercase, setLowerCase] = useState(false)
    const [numbers, setNumber] = useState(false)
    const [symbols, setSymbols] = useState(false)
    const [strength, setStrength] = useState ({strength: "", level: 0})

    //charsets
    const lowercaseLetters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
    const uppercaseLetters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
    const number =['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
    const symbol = ['`', '~', '!', '#', '@', '£', '$', '%', '&', '/', '(', ')', '*', '§', '+', '-', 'ç', '{', '}', '<', '>', '?', '.', ',', '=', '€', '_', '[', ']']


    function generateStrengthBars(){
        let counter = 0

        if(uppercase) counter ++
        if(lowercase) counter ++
        if(symbols) counter ++
        if(numbers) counter ++

        counter === 2 ? setStrength(prev=> ({strength: "WEAK", level: counter})) :
        counter === 3 ? setStrength(prev=> ({strength: "MEDIUM", level: counter})) :
        counter === 4 ? setStrength(prev=> ({strength: "STRONG", level: counter})) :
        setStrength(prev=> ({strength: "TOO WEAK", level: 1}))
    }   



    //This function is for handle range input change
    function handleChange(e){ setLength(e.target.value) }

    //This function use the Fisher-Yates algorithm for shuffling an array
    function shuffle(array) {
        let currentIndex = array.length,  randomIndex;
        while (currentIndex != 0) {
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex--;
          [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
        }
        return array;
      }
    
    
    function generatePassword(e){
        generateStrengthBars()
        e.preventDefault()
        //inizialize new empty array
        let shuffledArray
        let concatArr = []
        let outputString = ""
        
        //using the spread operator for merge the arrays
        if(uppercase) concatArr = [...concatArr, ...uppercaseLetters]
        if(lowercase) concatArr = [...concatArr, ...lowercaseLetters]
        if(numbers)   concatArr = [...concatArr, ...number]
        if(symbols)   concatArr = [...concatArr, ...symbol]
         

        shuffledArray = shuffle(concatArr)

        while(outputString.length < length){
            const randomNum = Math.floor(Math.random() * shuffledArray.length)
            outputString += shuffledArray[randomNum]
        }

        setOutput(outputString)
    }




    return (
       <div className="wrapper">
            <main className="generator">
                <p className="generator-title">Password Generator</p>
                <div className="generator-output-wrapper">
                <input type="text" 
                    className="generator-output"
                    value={output === "undefinedundefined" ? "" : output}
                    placeholder="P4$5W0rD!"
                    readOnly
                />
                <img 
                    src={copyIcon}
                    alt="CopyElement Icon" 
                    className="copy-icon"
                    onClick={() => {navigator.clipboard.writeText(output)}}
  
                />
                </div>

                <form onSubmit={generatePassword} className="generator-form">
                    <div className="form-character-length-wrapper">
                        <p className="form-character-length-intro">Character Length</p>
                        <p className="form-character-length">{length}</p>
                    </div>

                    <input type="range" 
                        className="range-input"
                        min="8"
                        max="16"
                        step="1"
                        value={length}
                        onChange={handleChange}
                    /> <br />

                    <input type="checkbox" id="uppercase-checkbox" checked={uppercase} onChange={()=>setUppercase(p => !p) }/>
                    <label htmlFor="uppercase-checkbox">Include Uppercase Letters</label> <br />    
                    
                    <input type="checkbox" id="lowercase-checkbox" checked={lowercase} onChange={()=>setLowerCase(p=>!p)} />
                    <label htmlFor="lowercase-checkbox">Include LowerCase Letters</label> <br />    
                    
                    <input type="checkbox" id="numbers-checkbox" checked={numbers} onChange={()=>setNumber(p =>!p)}/>
                    <label htmlFor="numbers-checkbox">Include Numbers</label> <br />    
                    
                    <input type="checkbox" id="symbols-checkbox" checked={symbols} onChange={()=>setSymbols(p=>!p) }/>
                    <label htmlFor="symbols-checkbox">Include Symbols</label> <br />    
                
                    <div className="form-strength">
                        <p className="form-strength-intro">STRENGTH</p>
                        <p className="form-strength-level">{strength.strength}</p>
                        <div className="form-strength-bars">
                            <div 
                                className="form-strength-bar"
                                style={{backgroundColor : 
                                    strength.level === 1 ? "#F64A4A":  
                                    strength.level === 2 ? "#FB7C58":  
                                    strength.level === 3 ? "#F8CD65":  
                                    strength.level === 4 ? "#A4FFAF":
                                    "transparent"
                                }}
                            ></div>
                            <div 
                                className="form-strength-bar"
                                style={{backgroundColor : 
                                    strength.level < 2 ? "transparent":
                                    strength.level === 2 ? "#FB7C58":  
                                    strength.level === 3 ? "#F8CD65":  
                                    "#A4FFAF"
                                }}
                            ></div>
                            <div 
                                className="form-strength-bar"
                                style={{backgroundColor : 
                                    strength.level < 3 ? "transparent":
                                    strength.level === 3 ? "#F8CD65":  
                                    "#A4FFAF"
                                }}
                            ></div>
                            <div 
                                className="form-strength-bar"
                                style={{backgroundColor : 
                                    strength.level < 4 ? "transparent":
                                    "#A4FFAF"
                                }}
                            ></div>
                           
                            
        
                        
                        </div>
                    </div>

                    <button className="form-button">Generate</button>

                </form>
            </main>
       </div>
    )
}