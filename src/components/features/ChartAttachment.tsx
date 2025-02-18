"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts'

const data = [
  { name: 'Jan', value: 400 },
  { name: 'Feb', value: 300 },
  { name: 'Mar', value: 600 },
  { name: 'Apr', value: 800 },
  { name: 'May', value: 500 },
]

export default function ChartAttachment() {
  return (
    <div className="h-48 w-full bg-black/30 rounded-lg p-4">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
          <XAxis 
            dataKey="name" 
            stroke="#ffffff60"
            fontSize={12}
          />
          <YAxis 
            stroke="#ffffff60"
            fontSize={12}
          />
          <Bar 
            dataKey="value" 
            fill="#579DFF" 
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
} 