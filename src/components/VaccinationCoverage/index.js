import {BarChart, Bar, XAxis, YAxis, Legend} from 'recharts'

import './index.css'

const VaccCoverage = props => {
  const {sevendaysvacc} = props

  const DataFormatter = number => {
    const mynumber = number * 1000
    if (mynumber > 1000) {
      return `${((number * 1000) / 1000).toString()}k`
    }
    return number.toString()
  }

  return (
    <div className="vacccovcontainer">
      <h1 className="headingcoverGE">Vaccination Coverage</h1>

      <BarChart
        data={sevendaysvacc}
        margin={{
          top: 5,
        }}
        width={1000}
        height={300}
      >
        <XAxis
          dataKey="vaccine_date"
          tick={{
            stroke: 'gray',
            strokeWidth: 1,
          }}
        />
        <YAxis
          tickFormatter={DataFormatter}
          tick={{
            stroke: 'gray',
            strokeWidth: 0,
          }}
        />
        <Legend
          wrapperStyle={{
            padding: 30,
          }}
        />
        <Bar dataKey="dose_1" name="Dose1" fill="#1f77b4" barSize="20%" />
        <Bar dataKey="dose_2" name="Dose2" fill="#f54394" barSize="20%" />
      </BarChart>
    </div>
  )
}

export default VaccCoverage
