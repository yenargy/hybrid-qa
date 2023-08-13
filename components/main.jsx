"use client"

import Thoughts from "@/components/thoughts";
import Observations from "@/components/observations";
import { useState } from 'react';

export default function Main() {
  const [formData, setFormData] = useState([]);

  const handleFormSubmit = (newData) => {
    setFormData((prevData) => [...prevData, newData]);
  }

  return (
    <div className="flex w-auto h-full justify-center">
      <div className="flex flex-col w-2/5 h-full">
        <div className="flex-1 overflow-y-auto p-4">
          <Thoughts onFormSubmit={handleFormSubmit} clearFormData={() => setFormData([])} formData={formData}/>
        </div>
      </div>
      <div className="flex flex-col w-2/5 h-full">
        <div className="flex-1 overflow-y-auto p-4">
          <Observations data={formData}/>
        </div>
      </div>
    </div>
  )
}