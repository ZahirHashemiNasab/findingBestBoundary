import './App.css';
import CanvasJSReact from './canvasjs-stock-1.7.2/canvasjs.stock.react';
import { data } from './ChartData';
import { mainData } from './data';
import { useEffect, useState } from 'react';
import { findBestAnswer } from './utils/utils';
let CanvasJS = CanvasJSReact.CanvasJS;
let CanvasJSStockChart = CanvasJSReact.CanvasJSStockChart;
const options = {
  animationEnabled: true,
  exportEnabled: true,
  charts: [{
    axisX: {
      crosshair: {
        enabled: true,
        snapToDataPoint: true
      }
    },
    axisY: {
      crosshair: {
        enabled: true,
        //snapToDataPoint: true
      }
    },
    data: [{
      type: "spline",
      dataPoints: data
    }]
  }],    
  rangeSelector: {
    inputFields: {
      startValue: 0,
      endValue: 356,
      valueFormatString: "###0"
    },
    
    buttons: []
  }
}

function App() {
  const [boundary,setBoundary]=useState(365)
  const [boundaryInput,setBoundaryInput] = useState()
  const [start,setStart] = useState(0)
  const [end,setEnd] = useState(data.length)
  const [showModal,setShowModal] = useState(true)


  useEffect(() => {
    findBestAnswer(data,boundary,data.length,boundaryCallBack)
  },[boundary,mainData])
  
  const containerProps = {
    width: "100%",
    height: "450px",
    margin: "auto"
  };
  const boundaryCallBack = (start,end) => {
    options.rangeSelector.inputFields.startValue = start
    options.rangeSelector.inputFields.endValue = end
    setStart(start)
    setEnd(end)
  }
const submitHandler = (event) => {
  event.preventDefault()
  setBoundary(boundaryInput)
  
}
const boundaryInputHandler = (event) => {
   setBoundaryInput(event?.target?.value)
}
  return (
    <div className="App" style={{position:'relative'}}>
      {showModal && 
      (<div style={{width:'100vw',height:'100vh',position:'absolute',top:'0px',zIndex:'100' ,opacity:'0.85',backgroundColor:'black',display:'flex',alignItems:'center',justifyContent:'center'}}>
        <div style={{width:'50%',height:'55%' ,backgroundColor:'white',zIndex:'101' ,opacity:'1' ,padding:'16px' }}>
          <p>
            .اپلیکیشن حاضر ابتدا یک عدد به عنوان اندازه بازه ی مد نظر از شما دریافت می کند سپس بازه ای کوچکتر مساوی عدد درخواستی شما را که در آن بیشترین فاصله ی بین ماکزیمم و مینیمم وجود دارد را نمایش می دهد
          </p>
          <p>
            به صورت کلی الگوریتم حاضر را با استفاده از دیتا استراکچر هیپ طراحی کرده ام . ابتدا آرایه ای به اندازه بازه ی دریافتی از کاربر را از ابتدای بازه ی کلی جدا نموده سپس یک مین هیپ و یک مکس هیپ از این آرایه استخراج می کنم . حال یک پنجره به اندازه ی بازه ی دریافتی از کاربر تعریف میکنم و در هر ایتریشن به اندازه یک واحد پنجره را میلغزانم و هر با فاصله ی مین و ماکس را که همان نود ریشه هیپ ها هستند با اندیس هایشان نگهداری میکنم در نهایت که پیمایش انجام شد آرایه ی فاصله ها را بررسی میکنم و ماکزیمم را پیدا خواهم کرد
          </p>
          <button type='submit' style={{marginTop:'16px',cursor:'pointer',width:'200px',height:'30px',color:'white', borderRadius:'8px',border:'1px solid white' , backgroundColor:'rgb(22 154 200)' ,fontSize:'14px',fontWeight:'600'}} onClick={() => setShowModal(false)}>شروع</button>
        </div>
      </div>)
      }
      <div> 
        <div >
          <form onSubmit={submitHandler} style={{height:'18vh', display:'flex' ,flexDirection:'column' , justifyContent:'center' ,alignItems:'center' , dir:'rtl'}}>
          <input style={{width:'200px', border:'1px solid #efefef',padding:'8px' ,height:'25px',borderRadius:'4px'}} placeholder='بازه ی زمانی (ثانیه)' dir='rtl' onChange={boundaryInputHandler} value={boundaryInput}/>
          <button type='submit' style={{marginTop:'16px',cursor:'pointer',width:'200px',height:'30px', borderRadius:'4px',border:'1px solid #efefef' , backgroundColor:'rgb(239 236 236)' ,fontSize:'14px',fontWeight:'600'}}>بررسی</button>
          </form>
        </div>
        <div>
          <p>نمودار زیر مربوط به قیمت یک ساله ی بیت کوین در سال ۲۰۱۸ می باشد</p>
        </div>
        <div>
          <p style={{color:'red',fontSize:'12px',fontWeight:'bold'}}> قسمت پایین نمودار بازه ی پیشنهادی را نشان می دهد که به صورت دستی نیز قابل تغییر است و امکان دیدن کل بازه ی یک ساله وجود دارد</p>
        </div>
      {boundaryInput &&  <div style={{display:'flex',flexDirection:'row-reverse' ,alignItems:'center',justifyContent:'center'}}>
        <p className='withMargin'>برای بازه انتخابی شما</p>
        <p className='withMargin'>بهترین انتخاب</p>
        <p className='withMargin'>از</p>
        <p className='withMargin'>{end}</p>
        <p className='withMargin'>تا</p>
        <p className='withMargin'>{start}</p>
        </div>
}
        <div>
         <CanvasJSStockChart containerProps={containerProps} options = {{...options}}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
