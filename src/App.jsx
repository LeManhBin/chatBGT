import axios from 'axios';
import { useState } from 'react';
import './App.css'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
export default function Home() {
  const [messageState, setMessageState] = useState({
    prompt: ""
  })
  const [isLoading, setIsLoading] = useState(false)
  const [messArray, setMessArray] = useState([])
  const [result, setResult] = useState([])
  const handleOnChange = (e) => {
    const {name, value} = e.target
    setMessageState({
      ...messageState,
      [name]: value
    })

  }
  const fetchData = async (payload) => {
    const res =  await axios.post('https://bot.botlly.com/api/turbo', payload,
    {
      headers: {
        'x-api-key' : "qkx8xfzhqQAn1KhJjfyNT3BlbkFy4" ,
      },
    })
    if(res.status === 200) {
      setResult([...result, res.data.choices[0].message.content])
      setIsLoading(false)
    }else {
      setIsLoading(true)
    }
    
    return res.data.choices[0].message.content
  }
  
  const handleSubmit = () => {
    setTimeout(() => {
      fetchData(messageState)
    }, 2000);
    setIsLoading(true)
    setMessArray(
      [...messArray, messageState.prompt]
    )
    setMessageState({
      prompt: ""
    })
  }

  const handleEnter = (e) => {
    if (e.key === 'Enter') {
      setTimeout(() => {
        fetchData(messageState)
      }, 2000);
      setIsLoading(true)
      setMessArray(
        [...messArray, messageState.prompt]
      )
      setMessageState({
        prompt: ""
      })
    }
  }

  return (

    <div className='container'>
        <div className='message-container'>
          {
            messArray.map((mess, index) => {
              return (
                <div className='screen'>
                    <div style={{display: 'flex', alignItems: 'center', flexDirection: "row-reverse"}}>
                      <img src="data:image/png;base64,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" alt="" />
                      <p className='client' key={index}>{mess}</p>
                    </div>
                    <div className='bot' key={index + 1}>
                        <img src="data:image/png;base64,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" alt="" />
                        {result[index] || "loading..."}
                    </div>
                </div>
              )
            })
          }
        </div>
        <div className='input-container'>
            <input type="text"  autoComplete="off" name='prompt' className='w-[400px] py-1 px-3 outline-none ' value={messageState.prompt} onChange={handleOnChange} onKeyDown={handleEnter}/>
            <button className='py-1 px-3 outline-none bg-lime-400' disabled={isLoading} onClick={handleSubmit}>Send</button>
        </div>
    </div>

  )
}
