import { useEffect, useState } from 'react'
import './index.scss'
import axios from 'axios'

const Item = ({ desc }) => {

  const [timeRemaining, setTimeRemaining] = useState(useState(desc['time'][1] - desc['time'][0])[0]);
  function judgeTime(time) {
    if (time < 10) {
      return '0' + time
    } else {
      return time
    }
  }
  function calculateTimeRemaining(timeDiff) {
    if (timeDiff <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }
    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);
    return { days, hours, minutes, seconds };
  }
  function formatDate(time) {
    let date = new Date(time);
    let mouth = (date.getMonth() + 1).toString().padStart(2, '0');
    let day = date.getDate().toString().padStart(2, '0');;
    let hour = date.getHours().toString().padStart(2, '0');
    let min = date.getMinutes().toString().padStart(2, '0');
    return ` ${mouth}.${day} ${hour}:${min}`
  }
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining((prevState) => prevState - 1000);
    }, 1000);
    return () => clearInterval(timer);
  }, []);
  return (
    <div className='item-container'>
      <div className='left'>
        <span>{desc.money}</span>
        <span>元</span>
      </div>
      <div className='middle'>
        <div>{desc.title}</div>
        <div className='mid-desc'>{desc.description}</div>

        <div className='last-container'>
          {
            desc.status === '使用' ? (<>距结束 :
              <div className='time-container'>
                <div className='time'>{calculateTimeRemaining(timeRemaining).hours}</div>:
                <div className='time'> {calculateTimeRemaining(timeRemaining).minutes}</div>:
                <div className='time'>{calculateTimeRemaining(timeRemaining).seconds}</div>
              </div></>) : (<>
                <div className='out-time'>
                  <span>有效期:{formatDate(desc.time[1])}</span>-<span>{formatDate(desc.time[0])}</span>
                </div>
              </>)
          }
        </div>
      </div>
      <div className='right'>
        {desc.status}
      </div>
    </div>
  )
}
function App() {
  const [list, setList] = useState([])

  useEffect(() => {
    axios.get('https://systemjs.1688.com/krump/schema/1352.json').then(res => {
      setList(res.data.list)
    })
  }, [])
  return (
    <>
      <div className='container'>
        <div className="title">1688进货红包</div>
        <div className="list">
          {
            list.map((item, index) => {
              return (
                <Item desc={item} key={index} />
              )
            })
          }
        </div>
      </div>
    </>
  )
}

export default App
