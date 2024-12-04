'use client'
import React, { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Image from 'next/image'
import axios from "axios"

const page = () => {

  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://fakestoreapi.com/products")
        const res = response.data;
        setData(res);
        console.log(response);
      }
      catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }

    };


    fetchData();
  }, [])
  if (loading) <h1>loading.....</h1>
  if (error) <h1>{error}</h1>

  return (
    <>
      <Navbar />
      <div>
        {
          data && data.length != 0 ? data.map((item) => (
            <div>

              <img src={item.image} className=' w-32' />
              <p key={item.id}>{item.title}</p>

            </div>
          )) : <h1> nothing to show </h1>
        }
      </div>

    </>
  )
}

export default page