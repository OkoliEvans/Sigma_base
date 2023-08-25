import Head from 'next/head'
import axios from 'axios'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'

export default function Home() {
  const [values, setValues] = useState({
    country:"",
    state:"",
    lga:"",
    first_name:"",
    last_name:"",
    phone:"",
    OTP:Math.floor(100000 + Math.random() * 700500),
  })

  const handleInput = (event) => {
    setValues((prev) => ({ ...prev, [event.target.name]: event.target.value }));
   }

const [loading, setLoading] = useState(false); // Add a loading state
const router = useRouter();
const sendDetailsToTwilioAPIandCheckDatabaseandWritetoDatabase =  async (e) => {
  setLoading(true);
  e.preventDefault();
  if (values.phone.length === 14){
  await axios.post('/api/sendvoterinfoapi', values)
  .then ((res) => {
    if (res.status === 200) {
      console.log(res)
      router.push('/votingverifypage')
    } 
    else {
   console.log('Try again!')
    }
  })
  .catch((err) => {
    console.log(err)
  })

  await axios.post('/api/twilioapi', values)
  .then ((res) => {
    if (res.status === 200) {
    console.log(res)
    }
    else {
   console.log('Try again!')
    }
  })
  .catch((err) => {
    console.log(err)
  })

.finally(() => {
  setLoading(false); // Request completed (whether successful or not), stop loading
});
  }
}

  return (
    <>
      <Head>
        <title>Welcome to Sigma Voting Page for Elections!</title>
        <meta name="description" content="Create voting app" />
        <link rel="icon" href="/favicon.ico" />
        <link href="https://fonts.googleapis.com/css?family=Montserrat" rel="stylesheet" />
      </Head>
        <div className='maindiv py-[5%] bg-[#224]'>
       <div className='text-center mb-[1%] text-[150%] lg:text-[200%] md:text-[200%] font-[600] text-[#fff]'>Welcome to the Sigma Voting Platform!</div>
       <div className='text-center font-[600] text-[#fff] text-[150%] mb-[1%]'>Fill all fields to vote.</div>
       <div className='text-[140%] font-[600] text-[#ffb644] mb-[2%] text-center'>You can vote only once!!! </div>
       
        <div>    
          <form onSubmit={sendDetailsToTwilioAPIandCheckDatabaseandWritetoDatabase}>
          <fieldset className='lg:mx-[30%] md:mx-[20%] mx-[5%] p-[3%] bg-[#eee] rounded-xl thefieldset' style={{boxShadow:"2px 2px 3px 3px #ffb644"}}>
          <div className='mb-[5%]'>
          <label className='text-[#000] text-[120%] font-[600] mb-[5%]'>Country</label>
          <input type="text" id="country" required name="country" value={values.country} onChange={handleInput} className='px-[0.3cm] py-[0.2cm] bg-[#224] text-[#fff] placeholder-[#ccc] w-[100%] rounded-md' placeholder='Input your country of origin'></input>
          </div>
          <div className='mb-[5%]'>
          <label className='text-[#000] text-[120%] font-[600] mb-[5%]'>State</label>
          <input type="text" id="state" required name="state" value={values.state} onChange={handleInput} className='px-[0.3cm] py-[0.2cm] bg-[#224] text-[#fff] placeholder-[#ccc] w-[100%] rounded-md' placeholder='Input your state of origin'></input>
          </div>
          <div className='mb-[5%]'>
          <label className='text-[#000] text-[120%] font-[600] mb-[5%]'>Local Government Area</label>
          <input type="text" id="lga" required name="lga" value={values.lga} onChange={handleInput} className='px-[0.3cm] py-[0.2cm] bg-[#224] text-[#fff] placeholder-[#ccc] w-[100%] rounded-md' placeholder='Input your LGA'></input>
          </div>
          <div className='mb-[5%]'>
          <label className='text-[#000] text-[120%] font-[600] mb-[5%]'>First Name</label>
          <input type="text" id="first_name" required name="first_name" value={values.first_name} onChange={handleInput} className='px-[0.3cm] py-[0.2cm] bg-[#224] text-[#fff] placeholder-[#ccc] w-[100%] rounded-md' placeholder='Input your first name'></input>
          </div>
          <div className='mb-[5%]'>
          <label className='text-[#000] text-[120%] font-[600] mb-[5%]'>Last Name</label>
          <input type="text" id="last_name" required name="last_name" value={values.last_name} onChange={handleInput} className='px-[0.3cm] py-[0.2cm] bg-[#224] text-[#fff] placeholder-[#ccc] w-[100%] rounded-md' placeholder='Input your last name'></input>
          </div>
          <div className='mb-[5%]'>
          <label className='text-[#000] text-[120%] font-[600] mb-[5%]'>Phone Number</label>
          <input type="text" id="phone" required name="phone" value={values.phone} onChange={handleInput} className='px-[0.3cm] py-[0.2cm] bg-[#224] text-[#fff] placeholder-[#ccc] w-[100%] rounded-md' placeholder='Input your phone number e.g +2348030000000'></input>
          </div>
          <button type="submit" className='p-[0.2cm] rounded-md bg-[#224] text-[#fff] font-[600] indexsubmitbutton'>Submit to Vote</button>
          </fieldset>
          </form>
        </div>

        {loading ? (
        <div className="custom-loader">
          <div className="loader-spinner"></div>
        </div>
      ) : <div></div>}
        </div>
    </>
  )
}
