import { useEffect, useState } from 'react'
import './index.scss'
import axios from 'axios'

const Item = ({ desc }) => {

  const [timeRemaining, setTimeRemaining] = useState(calculateTimeRemaining());
  function judgeTime(time) {
    if (time < 10) {
      return '0' + time
    } else {
      return time
    }
  }
  function calculateTimeRemaining() {
    let currentTime = new Date().getTime();
    const timeDiff = desc['time'][1] - currentTime;
    if (timeDiff <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    const seconds = Math.floor(timeDiff / 1000) % 60;
    const minutes = Math.floor(timeDiff / (1000 * 60)) % 60;
    const hours = Math.floor(timeDiff / (1000 * 60 * 60)) % 24;
    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    return { days, hours, minutes, seconds };
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining(calculateTimeRemaining());
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
          距结束 :
          <div className='time-container'>
            <div className='time'>{judgeTime(timeRemaining.hours)}</div>:
            <div className='time'> {judgeTime(timeRemaining.minutes)}</div>:
            <div className='time'>{judgeTime(timeRemaining.seconds)}</div>
          </div>
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
                <Item desc={item} />
              )
            })
          }
        </div>
      </div>
    </>
  )
}

export default App
