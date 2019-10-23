import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import useFetch from 'react-fetch-hook';
import axios from 'axios';
import './styles.css';

function UpLoadfile( {uploadFile} ){
    const [file, setFile] = useState();
    const [buttonText, setText] = useState('Choose File From Your Computer');
    const inputElement = useRef(null);
    
    const onDivClick = () =>{
        inputElement.current.click();
    }

    const handleSubmit = e => {
        e.preventDefault();
        if (!file) return;
        uploadFile(file);
        setFile(null);
        setText('Choose File From Your Computer');
    }

    return(
        <div className="uploadFile">
            <div className="uploadTitle">
                <h2>Upload Your File!</h2>
            </div>
            <div className="formContainer">
                <form onSubmit={ handleSubmit }>
                    <input
                        className="hideInput"
                        type="file"
                        ref={inputElement}
                        onChange={ e => {
                            if( e.target.files.length != 0 ){
                                setFile(e.target.files[0]);
                                setText(e.target.files[0].name);
                            }
                        }}
                    />
                    <div 
                        className="inputBox"
                        onClick={ onDivClick }
                    >
                        {buttonText}
                    </div>
                    <div>&nbsp;</div>
                    <button 
                        type="submit"
                        className="submitButton"
                    >
                        Upload
                    </button>
                </form>
            </div>
        </div>   
    );
}

function Result(props) {
    const { answer, message } = props;

    return (
        <div className="result">
            <div>
                <h3>{`${message} :`}</h3>
            </div>
            <div>
                <h3>{answer}</h3>
            </div>
        </div>
    );
}

function App() {
    const [answer, setAnswer] = useState();

    const uploadFile = (file) => {
        let formData = new FormData();
        formData.append('file', file);
        axios
            .post('http://localhost:4001/api/instructions', formData)
            .then(res => {
                setAnswer(res.data.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    const cleanUpResult= () => {
        setAnswer(null);
    }

    return (
        <div>
            <UpLoadfile uploadFile={uploadFile}/>

            {answer && 
                <div className="resultContainer">
                    <Result 
                        answer={answer.firstQusetionAnswer}
                        message="The result of part 1 is"
                    />
                    <Result 
                        answer={answer.secondQuestionAnswer}
                        message="The result of part 2 is"
                    />
                    <div>
                        <button 
                            onClick={cleanUpResult}
                            className="submitButton refreshButton"
                        >Clear Up</button>
                    </div>
                </div>
            }
        </div>  
    );
}

ReactDOM.render(<App />, document.getElementById('app'));
