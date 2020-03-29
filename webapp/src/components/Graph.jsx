import React from 'react'
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';


function Graph(props) {

    return (
        <div className="chart-wrapper">
            <LineChart
                width={800}
                height={500}
                data={props.data}
                margin={{
                    top: 5, right: 30, left: 20, bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey={props.label_1} stroke="#8884d8" activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey={props.label_2} stroke="#87d110" activeDot={{ r: 8 }} />
            </LineChart>
        </div>
    )
}


export default Graph;