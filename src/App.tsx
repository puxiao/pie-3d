import { Fragment, useState } from 'react'
import DatGui, { DatNumber } from 'react-dat-gui'
import Pie3D, { PieItemData } from '@/src/components/pie-3d'
import './App.css'
import './react-dat-gui.css'

const defaultPieData: { [key: string]: PieItemData } = {
    red: {
        name: 'A',
        value: 15,
        color: 'red'
    },
    blue: {
        name: 'B',
        value: 25,
        color: 'blue'
    },
    green: {
        name: 'C',
        value: 50,
        color: 'green'
    },
    yellow: {
        name: 'D',
        value: 35,
        color: 'yellow'
    }
}

function App() {
    const [pieData, setPieData] = useState(defaultPieData)

    const handleUpdate = (newData: any) => {
        console.log(newData)
        setPieData(prev => ({ ...prev, ...newData }))
    }

    return (
        <Fragment>
            <Pie3D data={[pieData.red, pieData.blue, pieData.green, pieData.yellow]} />
            <DatGui data={pieData} onUpdate={handleUpdate} style={{ width: '400px', overflow: 'hidden' }} >
                <DatNumber path='red.value' label='Red' min={0} max={100} step={1} />
                <DatNumber path='blue.value' label='Blue' min={0} max={100} step={1} />
                <DatNumber path='green.value' label='Green' min={0} max={100} step={1} />
                <DatNumber path='yellow.value' label='Yellow' min={0} max={100} step={1} />
            </DatGui>
        </Fragment>
    )
}

export default App;
