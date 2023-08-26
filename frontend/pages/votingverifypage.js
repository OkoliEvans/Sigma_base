import Head from 'next/head'
import axios from 'axios'
import { useRouter } from 'next/router'
import { useState } from 'react'


export default function Verify() {
  const [values, setValues] = useState({
    phone:"",
    OTP:"",
  })
 
  const handleInput = (event) => {
    setValues((prev) => ({ ...prev, [event.target.name]: event.target.value }));
   }
 
 const [loading, setLoading] = useState(false); // Add a loading state
 const router = useRouter();
 const sendDetailsToVotingVerifyAPI = async (e) => {
    setLoading(true);
    e.preventDefault();
  await axios.post('/api/votingverifyAPI', values)
  .then (res => {
   if (res.status === 200) {
     router.push('/index2')
   }
   else {
     console.log('Try again!')
   }
 })
 .catch(err => {
   console.log(err)
 })
 .finally(() => {
  setLoading(false); // Request completed (whether successful or not), stop loading
});
 }

  return (
    <>
      <Head>
        <title>Voting App</title>
        <meta name="description" content="Vote app" />
        <link rel="icon" href="/favicon.ico" />
        <link href="https://fonts.googleapis.com/css?family=Montserrat" rel="stylesheet" />
      </Head>
        <div className='maindiv bg-[#224] py-[5%]'>
       <div className='text-center mb-[1%] text-[180%] lg:text-[200%] md:text-[200%] font-[600] text-[#fff]'>Verification Page!</div>
       <div className='text-center font-[600] text-[140%] mb-[2%] text-[#ffb644]'>Verify Phone & OTP to proceed.</div>
        <div>    
          <form onSubmit={sendDetailsToVotingVerifyAPI}>
          <fieldset className='lg:mx-[30%] md:mx-[20%] mx-[5%] p-[3%] bg-[#eee] rounded-xl' style={{boxShadow:"2px 2px 3px 3px #ffb644"}}>
          <div className='mb-[5%]'>
          <label className='text-[#224] text-[120%] font-[600] mb-[5%]'>Phone Number</label>
          <input type="text" id="phone" name="phone" value={values.phone} onChange={handleInput} className='px-[0.3cm] py-[0.2cm] bg-[#224] text-[#fff] placeholder-[#ccc] w-[100%] rounded-md' placeholder='Verify phone number'></input>
          </div>
          <div className='mb-[5%]'>
          <label className='text-[#224] text-[120%] font-[600] mb-[5%]'>One Time Password (OTP)</label>
          <input type="text" id="OTP" name="OTP" value={values.OTP} onChange={handleInput} className='px-[0.3cm] py-[0.2cm] bg-[#224] text-[#fff] placeholder-[#ccc] w-[100%] rounded-md' placeholder='Verify OTP'></input>
          </div>
          <button type="submit" className='p-[0.3cm] rounded-md bg-[#224] text-[#fff] font-[600] indexsubmitbutton'>Verify Now</button>
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
